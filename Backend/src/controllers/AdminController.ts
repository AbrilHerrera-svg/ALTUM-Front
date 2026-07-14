import { Request, Response } from 'express';

// "Base de datos" en memoria — se borra al reiniciar el servidor.
// Cada ejercicio creado por el admin vive aquí como un objeto plano.
let ejercicios: any[] = [];
let contadorId = 1;

export class AdminController {
  // GET /api/admin/ejercicios - Listar todos los ejercicios
  static getEjercicios(req: Request, res: Response) {
    try {
      res.json({ message: 'GET todos los ejercicios', data: ejercicios });
    } catch (error) {
      res.status(500).json({ error: 'Error al obtener ejercicios' });
    }
  }

  // POST /api/admin/ejercicios - Crear nuevo ejercicio
  static createEjercicio(req: Request, res: Response) {
    try {
      const { descripcion, tip, id_tema, id_nivel, grado } = req.body;

      if (!descripcion) {
        res.status(400).json({ error: 'Falta el campo obligatorio: descripcion' });
        return;
      }

      const nuevo = { id: contadorId++, descripcion, tip, id_tema, id_nivel, grado };
      ejercicios.push(nuevo);

      res.status(201).json({ message: 'Ejercicio creado', data: nuevo });
    } catch (error) {
      res.status(500).json({ error: 'Error al crear ejercicio' });
    }
  }

  // PUT /api/admin/ejercicios/:id - Editar ejercicio
  static updateEjercicio(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const indice = ejercicios.findIndex(e => e.id === Number(id));

      if (indice === -1) {
        res.status(404).json({ error: 'Ejercicio no encontrado' });
        return;
      }

      const { descripcion, tip, id_tema, id_nivel, grado } = req.body;
      ejercicios[indice] = { ...ejercicios[indice], descripcion, tip, id_tema, id_nivel, grado };

      res.json({ message: `Ejercicio ${id} actualizado`, data: ejercicios[indice] });
    } catch (error) {
      res.status(500).json({ error: 'Error al actualizar ejercicio' });
    }
  }

  // DELETE /api/admin/ejercicios/:id - Eliminar ejercicio
  static deleteEjercicio(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const indice = ejercicios.findIndex(e => e.id === Number(id));

      if (indice === -1) {
        res.status(404).json({ error: 'Ejercicio no encontrado' });
        return;
      }

      ejercicios.splice(indice, 1);
      res.json({ message: `Ejercicio ${id} eliminado` });
    } catch (error) {
      res.status(500).json({ error: 'Error al eliminar ejercicio' });
    }
  }
}
