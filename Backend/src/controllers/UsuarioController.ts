import { Request, Response } from 'express';
import { Usuario } from '../models/Usuario';

export class UsuarioController {
  // Arreglo estático en memoria para simular nuestra base de datos volátil
  private static listaUsuarios: Usuario[] = [
    // Datos semilla iniciales para probar de inmediato
    new Usuario('Astronauta Inicial', 'Universidad', 'altum@utcancun.edu.mx', '👨‍🚀', 1)
  ];
  private static contadorId = 2;

  // READ (GET) - Obtener todos los usuarios
  public listar(req: Request, res: Response): void {
    // Convertimos cada objeto de la clase Usuario a JSON plano
    const resultado = UsuarioController.listaUsuarios.map(usuario => usuario.toJSON());
    res.status(200).json(resultado);
  }

  // CREATE (POST) - Agregar un nuevo usuario
  public crear(req: Request, res: Response): void {
    const { nombre, grado, correo, avatar } = req.body;

    if (!nombre || !grado || !correo) {
      res.status(400).json({ error: 'Faltan campos obligatorios (nombre, grado, correo)' });
      return;
    }

    // Instanciamos la clase aplicando POO
    const nuevoUsuario = new Usuario(
      nombre, 
      grado, 
      correo, 
      avatar || '👨‍🚀', 
      UsuarioController.contadorId++
    );

    UsuarioController.listaUsuarios.push(nuevoUsuario);
    res.status(201).json({ mensaje: 'Creado con éxito', usuario: nuevoUsuario.toJSON() });
  }

  // UPDATE (PUT) - Modificar un usuario existente por su ID
  public actualizar(req: Request, res: Response): void {
    const { id } = req.params;
    const { nombre, grado, correo, avatar } = req.body;

    const indice = UsuarioController.listaUsuarios.findIndex(u => u.getId() === Number(id));

    if (indice === -1) {
      res.status(404).json({ error: 'Usuario no encontrado en memoria' });
      return;
    }

    // Reemplazamos con una nueva instancia de la clase manteniendo el mismo ID
    UsuarioController.listaUsuarios[indice] = new Usuario(nombre, grado, correo, avatar, Number(id));
    res.status(200).json({ 
      mensaje: 'Actualizado con éxito', 
      usuario: UsuarioController.listaUsuarios[indice].toJSON() 
    });
  }

  // DELETE (DELETE) - Eliminar un usuario de la lista por su ID
  public eliminar(req: Request, res: Response): void {
    const { id } = req.params;
    
    const indice = UsuarioController.listaUsuarios.findIndex(u => u.getId() === Number(id));

    if (indice === -1) {
      res.status(404).json({ error: 'Usuario no encontrado' });
      return;
    }

    // Eliminamos el elemento de nuestro arreglo en memoria
    UsuarioController.listaUsuarios.splice(indice, 1);
    res.status(200).json({ mensaje: 'Usuario eliminado del arreglo temporal' });
  }
}