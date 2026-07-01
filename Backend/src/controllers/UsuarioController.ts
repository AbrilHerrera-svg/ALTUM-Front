// ============================================================
// UsuarioController.ts — CONTROLADOR DE USUARIOS
// Contiene la lógica de negocio para manejar usuarios.
// Implementa las 4 operaciones CRUD:
//   C → Create  (crear/registrar)
//   R → Read    (listar)
//   U → Update  (actualizar perfil)
//   D → Delete  (eliminar cuenta)
//
// IMPORTANTE: Los usuarios se guardan en MEMORIA RAM (un array).
// Esto significa que si reinicias el servidor, los usuarios se borran.
// ============================================================

import { Request, Response } from 'express'; // tipos de TypeScript para req y res
import { Usuario } from '../models/Usuario'; // importamos la clase Usuario

export class UsuarioController {

  // Array ESTÁTICO: existe uno solo para toda la app, no uno por petición.
  // "static" significa que pertenece a la CLASE, no a cada instancia.
  // Es como una variable global compartida entre todas las peticiones.
  private static listaUsuarios: Usuario[] = [
    new Usuario('Astronauta Inicial', 'Universidad', 'altum@utcancun.edu.mx', '👨‍🚀', 1)
  ];

  // Contador para asignar IDs únicos a cada nuevo usuario
  private static contadorId = 2; // empieza en 2 porque el usuario inicial ya tiene el 1

  // ── LISTAR ──────────────────────────────────────────────────
  // Responde a: GET /api/usuarios
  // Devuelve todos los usuarios registrados en memoria
  public listar(req: Request, res: Response): void {
    // .map() transforma cada objeto Usuario en su versión JSON plana (sin métodos)
    const resultado = UsuarioController.listaUsuarios.map(usuario => usuario.toJSON());
    res.status(200).json(resultado); // 200 = OK, todo salió bien
  }

  // ── CREAR (login + registro en uno) ─────────────────────────
  // Responde a: POST /api/usuarios
  // Si el nombre ya existe → hace LOGIN (devuelve el usuario existente)
  // Si el nombre es nuevo  → hace REGISTRO (crea el usuario y lo guarda)
  public crear(req: Request, res: Response): void {
    // req.body contiene los datos que mandó el frontend en el body del POST
    // La desestructuración saca propiedades específicas del objeto
    const { nombre, grado, correo, avatar } = req.body;

    // Solo el nombre es obligatorio — sin él no podemos identificar al alumno
    if (!nombre) {
      res.status(400).json({ error: 'Falta el campo obligatorio: nombre' }); // 400 = Bad Request
      return; // salimos de la función para no seguir ejecutando el resto
    }

    // .find() busca el primer elemento del array que cumpla la condición
    // .trim() elimina espacios al inicio y al final
    // .toLowerCase() convierte a minúsculas para comparar sin importar mayúsculas
    const usuarioExistente = UsuarioController.listaUsuarios.find(
      u => u.toJSON().nombre.trim().toLowerCase() === nombre.trim().toLowerCase()
    );

    // Si ya existe un usuario con ese nombre → es un LOGIN, no un registro
    if (usuarioExistente) {
      res.status(200).json({
        mensaje: 'Sesión iniciada (Usuario ya existía)',
        usuario: usuarioExistente.toJSON()
      });
      return;
    }

    // Si no existe → es un REGISTRO nuevo
    // El || es "valor por defecto": si grado llega vacío, usa 'Explorador'
    const nuevoUsuario = new Usuario(
      nombre,
      grado  || 'Explorador',
      correo || '',
      avatar || '👨‍🚀',
      UsuarioController.contadorId++ // asigna el ID actual y LUEGO lo incrementa para el siguiente
    );

    UsuarioController.listaUsuarios.push(nuevoUsuario); // agrega al array en memoria
    res.status(201).json({                              // 201 = Created (recurso creado)
      mensaje: 'Creado con éxito',
      usuario: nuevoUsuario.toJSON()
    });
  }

  // ── ACTUALIZAR ───────────────────────────────────────────────
  // Responde a: PUT /api/usuarios/:id
  // Reemplaza los datos de un usuario existente (nombre, grado, avatar)
  public actualizar(req: Request, res: Response): void {
    const { id } = req.params;                         // el id viene en la URL: /api/usuarios/5
    const { nombre, grado, correo, avatar } = req.body; // los nuevos datos vienen en el body

    // .findIndex() devuelve la POSICIÓN en el array, o -1 si no lo encuentra
    const indice = UsuarioController.listaUsuarios.findIndex(u => u.getId() === Number(id));
    // Number(id) convierte el string "5" al número 5 para poder compararlo

    if (indice === -1) {
      res.status(404).json({ error: 'Usuario no encontrado en memoria' }); // 404 = Not Found
      return;
    }

    // Reemplazamos el usuario en esa posición con uno nuevo que tiene los datos actualizados
    UsuarioController.listaUsuarios[indice] = new Usuario(nombre, grado, correo, avatar, Number(id));
    res.status(200).json({
      mensaje: 'Actualizado con éxito',
      usuario: UsuarioController.listaUsuarios[indice].toJSON()
    });
  }

  // ── ELIMINAR ─────────────────────────────────────────────────
  // Responde a: DELETE /api/usuarios/:id
  // Borra un usuario del array en memoria
  public eliminar(req: Request, res: Response): void {
    const { id } = req.params;

    const indice = UsuarioController.listaUsuarios.findIndex(u => u.getId() === Number(id));

    if (indice === -1) {
      res.status(404).json({ error: 'Usuario no encontrado' });
      return;
    }

    // .splice(posición, cuántos eliminar) → quita 1 elemento en esa posición del array
    UsuarioController.listaUsuarios.splice(indice, 1);
    res.status(200).json({ mensaje: 'Usuario eliminado del arreglo temporal' });
  }
}
