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
      const { nombre_grupo, id_tutor, grado } = req.body;

      if (!nombre_grupo || !id_tutor) {
        res.status(400).json({ error: 'nombre_grupo e id_tutor son obligatorios' });
        return;
      }

      const grupo = await GrupoManager.crear(nombre_grupo, Number(id_tutor), grado);
      res.status(201).json({ message: 'Grupo creado', data: grupo });
    } catch (error: any) {
      res.status(500).json({ error: 'Error al crear grupo', detalle: error.message });
    }
  }

  // GET /api/teacher/grupos/codigo/:codigo — Buscar grupo por su código
  // (lo usa la pantalla de registro para autocompletar el grado del alumno)
  public async getGrupoPorCodigo(req: Request, res: Response): Promise<void> {
    try {
      const { codigo } = req.params;
      const grupo = await GrupoManager.buscarPorCodigo(codigo as string);

      if (!grupo) {
        res.status(404).json({ error: 'Código no válido' });
        return;
      }

      // Solo lo estrictamente necesario para el formulario de registro
      res.status(200).json({
        data: { nombre_grupo: grupo.nombre_grupo, grado: grupo.grado },
      });
    } catch (error: any) {
      res.status(500).json({ error: 'Error al buscar el grupo', detalle: error.message });
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

      await GrupoManager.asignarTema(Number(id), id_tema);
      res.status(200).json({ message: 'Tema asignado al grupo' });
    } catch (error: any) {
      res.status(500).json({ error: 'Error al asignar tema al grupo', detalle: error.message });
    }
  }

  // DELETE /api/teacher/grupos/:id/temas/:id_tema — Quitar tema del grupo
  public async removeTemaFromGrupo(req: Request, res: Response): Promise<void> {
    try {
      const { id, id_tema } = req.params; // id = id_grupo, id_tema = el SLUG del tema
      await GrupoManager.quitarTema(Number(id), id_tema as string);
      res.status(200).json({ message: 'Tema quitado del grupo' });
    } catch (error: any) {
      res.status(500).json({ error: 'Error al quitar tema del grupo', detalle: error.message });
    }
  }

  // ── NIVELES ESPECÍFICOS POR GRUPO (la UI le llama "Ejercicios") ──
  // Dentro de un tema ya asignado al grupo, el maestro puede elegir
  // exactamente qué niveles (0-7) puede jugar ese grupo.

  // POST /api/teacher/grupos/:id/ejercicios — body: { id_tema (slug), id_nivel (0-7) }
  public async assignEjercicioToGrupo(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const { id_tema, id_nivel } = req.body;

      if (!id_tema || id_nivel === undefined) {
        res.status(400).json({ error: 'id_tema e id_nivel son obligatorios' });
        return;
      }

      await GrupoManager.asignarNivel(Number(id), id_tema, Number(id_nivel));
      res.status(200).json({ message: 'Nivel asignado al grupo' });
    } catch (error: any) {
      res.status(500).json({ error: 'Error al asignar el nivel al grupo', detalle: error.message });
    }
  }

  // DELETE /api/teacher/grupos/:id/ejercicios/:id_ejercicio — id_ejercicio = "slug-ordenNivel" (ej. "numeric-3")
  public async removeEjercicioFromGrupo(req: Request, res: Response): Promise<void> {
    try {
      const { id, id_ejercicio } = req.params;
      const idEjercicio = id_ejercicio as string;
      const separador = idEjercicio.lastIndexOf('-');

      if (separador === -1) {
        res.status(400).json({ error: 'id_ejercicio inválido, debe tener el formato "slug-nivel"' });
        return;
      }

      const slugTema = idEjercicio.slice(0, separador);
      const ordenNivel = Number(idEjercicio.slice(separador + 1));

      await GrupoManager.quitarNivel(Number(id), slugTema, ordenNivel);
      res.status(200).json({ message: 'Nivel quitado del grupo' });
    } catch (error: any) {
      res.status(500).json({ error: 'Error al quitar el nivel del grupo', detalle: error.message });
    }
  }
}