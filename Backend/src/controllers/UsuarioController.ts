// ============================================================
// UsuarioController.ts — CONTROLADOR DE USUARIOS
// Implementa las 4 operaciones CRUD:
//   C → Create  (crear/registrar)
//   R → Read    (listar)
//   U → Update  (actualizar perfil)
//   D → Delete  (eliminar cuenta)
// ============================================================

import { Request, Response } from 'express';
import { Usuario } from '../models/Usuario';
import { agregarEstudiantePorCodigo } from './TeacherController';

export class UsuarioController {

  // Contraseña secreta para ser admin — solo desarrolladores
  private static ADMIN_SECRET = 'dev_admin_2024';

  // ── LOGIN → POST /api/usuarios/login ─────────────────────────
  // Verifica correo + contraseña en el servidor. Nunca confiar en el
  // frontend para esta validación — por eso existe este endpoint aparte.
  public login(req: Request, res: Response): void {
    const { correo, contraseña } = req.body;

    if (!correo || !contraseña) {
      res.status(400).json({ error: 'Correo y contraseña son obligatorios' });
      return;
    }

    const usuario = UsuarioController.listaUsuarios.find(
      u => u.getCorreo().trim().toLowerCase() === correo.trim().toLowerCase()
    );

    // Comparamos también si no existe el usuario o si la contraseña no coincide.
    // El mensaje de error es el mismo en ambos casos para no revelar
    // si el correo existe o no (buena práctica de seguridad).
    if (!usuario || usuario.getContraseña() !== contraseña) {
      res.status(401).json({ error: 'Correo o contraseña incorrectos' });
      return;
    }

    res.status(200).json({ mensaje: 'Sesión iniciada', usuario: usuario.toJSON() });
  }


  // ── ¿QUÉ ES ESTE ARREGLO? ───────────────────────────────────
  // Un ARREGLO (array) es una lista ordenada de elementos.
  // Aquí guardamos objetos de tipo Usuario.
  // Se escribe con corchetes [ ] y los elementos van separados por comas.
  //
  // Ejemplo visual de cómo se ve en memoria:
  //   listaUsuarios = [
  //     Usuario { id:1, nombre:'Astronauta Inicial', ... },  ← posición 0
  //     Usuario { id:2, nombre:'Abril', ... },               ← posición 1
  //     Usuario { id:3, nombre:'Melina', ... }               ← posición 2
  //   ]
  //
  // "static" → existe UN SOLO arreglo para toda la app (no uno por petición)
  // "private" → solo esta clase puede acceder a él
  private static listaUsuarios: Usuario[] = [
    new Usuario('Astronauta Inicial', 'Universidad', 'altum@utcancun.edu.mx', '👨‍🚀', 1),
    new Usuario('Admin', 'Universidad', 'admin@altum.com', '🛠️', 2, 'admin', 'dev_admin_2024'),
  ];

  // Contador para generar IDs únicos. Empieza en 3 porque los usuarios de arriba ya tienen 1 y 2.
  private static contadorId = 3;


  // ── LISTAR → GET /api/usuarios ───────────────────────────────
  public listar(req: Request, res: Response): void {

    // .map() recorre CADA elemento del arreglo y lo transforma.
    // Es como hacer una fila de fotocopias: por cada Usuario original,
    // produces una versión JSON plana (sin métodos).
    //
    // Si listaUsuarios tiene 3 usuarios:
    //   .map(usuario => usuario.toJSON())
    // produce un nuevo arreglo con 3 objetos JSON:
    //   [ {id:1, nombre:'...'}, {id:2, nombre:'...'}, {id:3, nombre:'...'} ]
    const resultado = UsuarioController.listaUsuarios.map(usuario => usuario.toJSON());

    res.status(200).json(resultado); // 200 = OK
  }


  // ── CREAR → POST /api/usuarios ───────────────────────────────
  public crear(req: Request, res: Response): void {
    const { nombre, grado, correo, avatar, role, adminSecret, contraseña, classCode } = req.body;

    // ── IF #1: Validación de campo obligatorio ───────────────
    // Si NO existe el nombre (!nombre es true cuando nombre es '', null, undefined)
    // entonces respondemos con error y salimos de la función.
    //
    // !nombre es true cuando nombre es:
    //   - undefined (no se mandó en el body)
    //   - null
    //   - '' (string vacío)
    //   - 0, false (aunque no aplican aquí)
    if (!nombre) {
      res.status(400).json({ error: 'Falta el campo obligatorio: nombre' });
      return; // "return" sin valor sale de la función — no ejecuta nada más abajo
    }

    // ── .find() sobre el arreglo ─────────────────────────────
    // .find() busca el PRIMER elemento que cumpla la condición dentro del [ ].
    // Si no encuentra ninguno, devuelve undefined.
    //
    // Ejemplo:
    //   listaUsuarios = [ Usuario{nombre:'Abril'}, Usuario{nombre:'Melina'} ]
    //   .find(u => u.getNombre() === 'Abril')
    //   → devuelve el primer Usuario, el de Abril
    //
    // .trim()       → elimina espacios al inicio y al final: '  Abril  ' → 'Abril'
    // .toLowerCase()→ pone en minúsculas para comparar sin importar mayúsculas: 'ABRIL' → 'abril'
    const usuarioExistente = UsuarioController.listaUsuarios.find(
      u => u.toJSON().nombre.trim().toLowerCase() === nombre.trim().toLowerCase()
    );

    // ── IF #2: ¿Ya existe el usuario? (Login) ────────────────
    // Si .find() encontró algo, usuarioExistente tiene un valor (no es undefined)
    // Si .find() no encontró nada, usuarioExistente es undefined (falsy)
    if (usuarioExistente) {
      // Ya existe → es un LOGIN, devolvemos sus datos originales
      res.status(200).json({
        mensaje: 'Sesión iniciada (Usuario ya existía)',
        usuario: usuarioExistente.toJSON()
      });
      return;
    }

    // Si llegamos aquí es porque el IF de arriba fue falso (no existe el usuario)
    // → es un REGISTRO nuevo

    // Validar si intenta ser admin
    let finalRole: 'student' | 'teacher' | 'admin' = role || 'student';
    if (role === 'admin') {
      if (adminSecret !== UsuarioController.ADMIN_SECRET) {
        res.status(403).json({ error: 'No autorizado para crear admin sin contraseña correcta' });
        return;
      }
    }

    // El operador || da un valor por defecto si el de la izquierda es falsy:
    //   grado || 'Explorador'  → si grado es '' o undefined, usa 'Explorador'
    //   avatar || '👨‍🚀'       → si no mandaron avatar, usa el astronauta
    const nuevoUsuario = new Usuario(
      nombre,
      grado  || 'Explorador',
      correo || '',
      avatar || '👨‍🚀',
      UsuarioController.contadorId++, // asigna el ID actual Y LUEGO incrementa para el siguiente
      finalRole,
      contraseña || ''
    );

    // .push() agrega un elemento AL FINAL del arreglo
    // Antes: [ Usuario{id:1}, Usuario{id:2} ]
    // push(nuevoUsuario con id:3)
    // Después: [ Usuario{id:1}, Usuario{id:2}, Usuario{id:3} ]
    UsuarioController.listaUsuarios.push(nuevoUsuario);

    // Si es estudiante y trajo un código de clase, lo unimos automáticamente al grupo
    let grupoUnido: string | null = null;
    let codigoInvalido = false;
    if (finalRole === 'student' && classCode && String(classCode).trim()) {
      const usuarioJSON = nuevoUsuario.toJSON();
      const grupo = agregarEstudiantePorCodigo(String(classCode).trim(), {
        id_usuario: usuarioJSON.id as number,
        nombre: usuarioJSON.nombre,
        correo: usuarioJSON.correo,
      });
      if (grupo) {
        grupoUnido = grupo.nombre_grupo;
      } else {
        codigoInvalido = true;
      }
    }

    res.status(201).json({
      mensaje: 'Creado con éxito',
      usuario: nuevoUsuario.toJSON(),
      grupoUnido,
      codigoInvalido,
    });
    // 201 = Created (se creó un recurso nuevo exitosamente)
  }


  // ── ACTUALIZAR → PUT /api/usuarios/:id ──────────────────────
  public actualizar(req: Request, res: Response): void {
    const { id } = req.params;
    const { nombre, grado, correo, avatar, role } = req.body;

    // .findIndex() es igual que .find() PERO devuelve el NÚMERO DE POSICIÓN
    // en lugar del elemento en sí.
    //
    // Ejemplo:
    //   listaUsuarios = [ Usuario{id:1}, Usuario{id:2}, Usuario{id:3} ]
    //   .findIndex(u => u.getId() === 2)
    //   → devuelve 1 (posición 1 del arreglo, porque los arreglos empiezan en 0)
    //
    // Number(id) convierte el string "5" al número 5
    // (los parámetros de URL siempre llegan como strings)
    const indice = UsuarioController.listaUsuarios.findIndex(u => u.getId() === Number(id));

    // ── IF #3: ¿Se encontró el usuario? ──────────────────────
    // Si findIndex no encontró nada, devuelve -1
    // -1 significa "no existe en el arreglo"
    if (indice === -1) {
      res.status(404).json({ error: 'Usuario no encontrado en memoria' }); // 404 = Not Found
      return;
    }

    // Reemplazamos el elemento en esa posición con un nuevo objeto Usuario actualizado.
    // Es como cambiar una carta en una posición específica de la baraja.
    // Antes: listaUsuarios[1] = Usuario{nombre:'Abril viejo'}
    // Después: listaUsuarios[1] = Usuario{nombre:'Abril nuevo'}
    UsuarioController.listaUsuarios[indice] = new Usuario(nombre, grado, correo, avatar, Number(id), role || 'student');
    res.status(200).json({
      mensaje: 'Actualizado con éxito',
      usuario: UsuarioController.listaUsuarios[indice].toJSON()
    });
  }


  // ── ELIMINAR → DELETE /api/usuarios/:id ─────────────────────
  public eliminar(req: Request, res: Response): void {
    const { id } = req.params;

    const indice = UsuarioController.listaUsuarios.findIndex(u => u.getId() === Number(id));

    // ── IF #4: ¿Se encontró el usuario a eliminar? ───────────
    if (indice === -1) {
      res.status(404).json({ error: 'Usuario no encontrado' });
      return;
    }

    // .splice(posición, cuántos_eliminar) modifica el arreglo original.
    // Elimina 1 elemento en la posición "indice".
    //
    // Ejemplo:
    //   listaUsuarios = [ A, B, C, D ]
    //   .splice(1, 1)  → elimina el elemento en posición 1 (B)
    //   listaUsuarios queda: [ A, C, D ]
    //   Los elementos se "recorren" automáticamente para llenar el hueco.
    UsuarioController.listaUsuarios.splice(indice, 1);
    res.status(200).json({ mensaje: 'Usuario eliminado del arreglo temporal' });
  }
}
