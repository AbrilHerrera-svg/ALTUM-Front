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

    if (!nombre || !grado || !correo) {
      res.status(400).json({ error: 'Faltan campos obligatorios (nombre, grado, correo)' });
      return;
    }

    
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