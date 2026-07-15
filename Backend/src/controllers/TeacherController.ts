// ============================================================
// TeacherController.ts — refactorizado al patrón "recepcionista".
// Ya no guarda grupos en un array en memoria: todo vive en MySQL
// a través de GrupoManager.
// ============================================================

import { Request, Response } from 'express';
import { GrupoManager } from '../services/GrupoManager';

export class TeacherController {

  // POST /api/teacher/grupos — Crear nuevo grupo
  public async createGrupo(req: Request, res: Response): Promise<void> {
    try {
      const { nombre_grupo, id_tutor } = req.body;

      if (!nombre_grupo || !id_tutor) {
        res.status(400).json({ error: 'nombre_grupo e id_tutor son obligatorios' });
        return;
      }

      const grupo = await GrupoManager.crear(nombre_grupo, Number(id_tutor));
      res.status(201).json({ message: 'Grupo creado', data: grupo });
    } catch (error: any) {
      res.status(500).json({ error: 'Error al crear grupo', detalle: error.message });
    }
  }

  // GET /api/teacher/grupos/:id — Ver grupo específico
  public async getGrupo(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const grupo = await GrupoManager.buscarPorId(Number(id));

      if (!grupo) {
        res.status(404).json({ error: 'Grupo no encontrado' });
        return;
      }
      res.json({ message: `Grupo ${id} obtenido`, data: grupo });
    } catch (error: any) {
      res.status(500).json({ error: 'Error al obtener grupo', detalle: error.message });
    }
  }

  // GET /api/teacher/mis-grupos/:id_tutor — Listar grupos del tutor
  public async getMisGrupos(req: Request, res: Response): Promise<void> {
    try {
      const { id_tutor } = req.params;
      const grupos = await GrupoManager.listarPorTutor(Number(id_tutor));
      res.json({ message: `Grupos del tutor ${id_tutor}`, data: grupos });
    } catch (error: any) {
      res.status(500).json({ error: 'Error al obtener grupos', detalle: error.message });
    }
  }

  // GET /api/teacher/mi-grupo/:id_estudiante — Grupo al que pertenece un alumno
  public async getGrupoDeEstudiante(req: Request, res: Response): Promise<void> {
    try {
      const { id_estudiante } = req.params;
      const grupo = await GrupoManager.grupoDeEstudiante(Number(id_estudiante));
      res.json({
        message: grupo ? 'Grupo encontrado' : 'El estudiante no pertenece a ningún grupo',
        data: grupo,
      });
    } catch (error: any) {
      res.status(500).json({ error: 'Error al obtener el grupo del estudiante', detalle: error.message });
    }
  }

  // GET /api/teacher/grupos/:id/estudiantes — Alumnos de un grupo
  public async getEstudiantesDeGrupo(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const estudiantes = await GrupoManager.estudiantesDelGrupo(Number(id));
      res.json({ message: `Alumnos del grupo ${id}`, data: estudiantes });
    } catch (error: any) {
      res.status(500).json({ error: 'Error al obtener alumnos del grupo', detalle: error.message });
    }
  }

  // POST /api/teacher/grupos/:id/estudiantes — Agregar alumno YA REGISTRADO al grupo
  public async addEstudianteToGrupo(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const { id_usuario } = req.body;

      if (!id_usuario) {
        res.status(400).json({ error: 'id_usuario es obligatorio' });
        return;
      }

      await GrupoManager.agregarEstudiante(Number(id), Number(id_usuario));
      res.status(200).json({ message: 'Alumno agregado al grupo' });
    } catch (error: any) {
      res.status(500).json({ error: 'Error al agregar alumno al grupo', detalle: error.message });
    }
  }

  // DELETE /api/teacher/grupos/:id/estudiantes/:id_usuario — Quitar alumno del grupo
  public async removeEstudianteFromGrupo(req: Request, res: Response): Promise<void> {
    try {
      const { id_usuario } = req.params;
      await GrupoManager.quitarEstudiante(Number(id_usuario));
      res.status(200).json({ message: 'Alumno quitado del grupo' });
    } catch (error: any) {
      res.status(500).json({ error: 'Error al quitar alumno del grupo', detalle: error.message });
    }
  }

  // POST /api/teacher/grupos/:id/temas — Asignar un tema al grupo
  public async assignTemaToGrupo(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const { id_tema } = req.body;

      if (!id_tema) {
        res.status(400).json({ error: 'id_tema es obligatorio' });
        return;
      }

      await GrupoManager.asignarTema(Number(id), Number(id_tema));
      res.status(200).json({ message: 'Tema asignado al grupo' });
    } catch (error: any) {
      res.status(500).json({ error: 'Error al asignar tema al grupo', detalle: error.message });
    }
  }

  // DELETE /api/teacher/grupos/:id/temas/:id_tema — Quitar tema del grupo
  public async removeTemaFromGrupo(req: Request, res: Response): Promise<void> {
    try {
      const { id_tema } = req.params;
      await GrupoManager.quitarTema(Number(id_tema));
      res.status(200).json({ message: 'Tema quitado del grupo' });
    } catch (error: any) {
      res.status(500).json({ error: 'Error al quitar tema del grupo', detalle: error.message });
    }
  }

  // ── EJERCICIOS POR GRUPO — TODAVÍA NO IMPLEMENTADO ─────────
  // Tu tabla `ejercicios` solo tiene FK a `niveles` (no a `grupos`), y el
  // catálogo real que usa el juego vive hardcodeado en EjercicioController,
  // no en esta tabla. Falta decidir el diseño antes de programar esto:
  // ¿se agrega una tabla puente grupo_ejercicio, o se asignan por TEMA
  // (que sí tiene id_grupo) y ya no por ejercicio individual?
  public async assignEjercicioToGrupo(req: Request, res: Response): Promise<void> {
    res.status(501).json({ error: 'Asignar ejercicios por grupo aún no está implementado.' });
  }

  public async removeEjercicioFromGrupo(req: Request, res: Response): Promise<void> {
    res.status(501).json({ error: 'Quitar ejercicios por grupo aún no está implementado.' });
  }
}