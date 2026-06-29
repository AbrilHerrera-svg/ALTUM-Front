import { Request, Response } from 'express';
import { Usuario } from '../models/Usuario';

export class UsuarioController {
  
  private static listaUsuarios: Usuario[] = [
    new Usuario('Astronauta Inicial', 'Universidad', 'altum@utcancun.edu.mx', '👨‍🚀', 1)
  ];
  private static contadorId = 2;

  
  public listar(req: Request, res: Response): void {
    const resultado = UsuarioController.listaUsuarios.map(usuario => usuario.toJSON());
    res.status(200).json(resultado);
  }

  
  public crear(req: Request, res: Response): void {
    const { nombre, grado, correo, avatar } = req.body;

    // Solo hacemos obligatorio el nombre para poder buscarlo o crearlo
    if (!nombre) {
      res.status(400).json({ error: 'Falta el campo obligatorio: nombre' });
      return;
    }

    // 🎯 1. BÚSQUEDA: Verificamos si ya existe alguien con ese nombre exacto
    const usuarioExistente = UsuarioController.listaUsuarios.find(
      u => u.toJSON().nombre.trim().toLowerCase() === nombre.trim().toLowerCase()
    );

    // 🎯 2. LOGIN (Ya existía): Le damos la bienvenida de vuelta devolviendo su ID original
    if (usuarioExistente) {
      res.status(200).json({ 
        mensaje: 'Sesión iniciada (Usuario ya existía)', 
        usuario: usuarioExistente.toJSON() 
      });
      return;
    }

    // 🎯 3. REGISTRO (Es nuevo): Creamos la nueva instancia y lo guardamos
    const nuevoUsuario = new Usuario(
      nombre, 
      grado || 'Explorador', 
      correo || '', 
      avatar || '👨‍🚀', 
      UsuarioController.contadorId++
    );

    UsuarioController.listaUsuarios.push(nuevoUsuario);
    res.status(201).json({ 
      mensaje: 'Creado con éxito', 
      usuario: nuevoUsuario.toJSON() 
    });
  }

  
  public actualizar(req: Request, res: Response): void {
    const { id } = req.params;
    const { nombre, grado, correo, avatar } = req.body;

    const indice = UsuarioController.listaUsuarios.findIndex(u => u.getId() === Number(id));

    if (indice === -1) {
      res.status(404).json({ error: 'Usuario no encontrado en memoria' });
      return;
    }

    
    UsuarioController.listaUsuarios[indice] = new Usuario(nombre, grado, correo, avatar, Number(id));
    res.status(200).json({ 
      mensaje: 'Actualizado con éxito', 
      usuario: UsuarioController.listaUsuarios[indice].toJSON() 
    });
  }

 
  public eliminar(req: Request, res: Response): void {
    const { id } = req.params;
    
    const indice = UsuarioController.listaUsuarios.findIndex(u => u.getId() === Number(id));

    if (indice === -1) {
      res.status(404).json({ error: 'Usuario no encontrado' });
      return;
    }

    
    UsuarioController.listaUsuarios.splice(indice, 1);
    res.status(200).json({ mensaje: 'Usuario eliminado del arreglo temporal' });
  }
}