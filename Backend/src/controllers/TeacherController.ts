import { Request, Response } from 'express';

// "Base de datos" en memoria de los grupos del maestro.
// Cada grupo guarda sus estudiantes, temas y ejercicios asignados como arreglos anidados.
let grupos: any[] = [];
let contadorId = 1;

// Genera un código corto y fácil de compartir, ej: "X7K2QT"
function generarCodigoUnico(): string {
  const CARACTERES = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789'; // sin 0/O ni 1/I para evitar confusión
  let codigo = '';
  do {
    codigo = Array.from({ length: 6 }, () => CARACTERES[Math.floor(Math.random() * CARACTERES.length)]).join('');
  } while (grupos.some(g => g.codigo === codigo));
  return codigo;
}

// Usado por UsuarioController al registrar un estudiante con código de clase.
// Devuelve el grupo al que se unió, o null si el código no existe.
export function agregarEstudiantePorCodigo(codigo: string, estudiante: { id_usuario: number; nombre: string; correo: string }) {
  if (!codigo) return null;
  const grupo = grupos.find(g => g.codigo === codigo.trim().toUpperCase());
  if (!grupo) return null;

  if (!grupo.estudiantes.some((e: any) => e.id_usuario === estudiante.id_usuario)) {
    grupo.estudiantes.push(estudiante);
  }
  return grupo;
}

export class TeacherController {
  // POST /api/teacher/grupos - Crear nuevo grupo
  static createGrupo(req: Request, res: Response) {
    try {
      const { nombre_grupo, descripcion, grado, id_profesor } = req.body;

      if (!nombre_grupo) {
        res.status(400).json({ error: 'El nombre del grupo es obligatorio' });
        return;
      }

      const nuevo = {
        id_grupo: contadorId++,
        nombre_grupo,
        descripcion: descripcion || '',
        grado: grado || '4°',
        id_profesor,
        codigo: generarCodigoUnico(),
        fecha_creacion: new Date(),
        estudiantes: [] as any[],
        temas: [] as any[],
        ejercicios: [] as any[],
      };

      grupos.push(nuevo);
      res.status(201).json({ message: 'Grupo creado', data: nuevo });
    } catch (error) {
      res.status(500).json({ error: 'Error al crear grupo' });
    }
  }

  // GET /api/teacher/grupos/:id - Ver grupo específico
  static getGrupo(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const grupo = grupos.find(g => g.id_grupo === Number(id));

      if (!grupo) {
        res.status(404).json({ error: 'Grupo no encontrado' });
        return;
      }

      res.json({ message: `Grupo ${id} obtenido`, data: grupo });
    } catch (error) {
      res.status(500).json({ error: 'Error al obtener grupo' });
    }
  }

  // GET /api/teacher/mis-grupos/:id_profesor - Listar grupos del profesor
  static getMisGrupos(req: Request, res: Response) {
    try {
      const { id_profesor } = req.params;
      const misGrupos = grupos.filter(g => g.id_profesor === id_profesor);
      res.json({ message: `Grupos del profesor ${id_profesor}`, data: misGrupos });
    } catch (error) {
      res.status(500).json({ error: 'Error al obtener grupos' });
    }
  }

  // GET /api/teacher/mi-grupo/:correo - Grupo al que pertenece un estudiante (si tiene uno)
  static getGrupoDeEstudiante(req: Request, res: Response) {
    try {
      const { correo } = req.params;
      const grupo = grupos.find(g => g.estudiantes.some((e: any) => e.correo === correo));
      res.json({ message: grupo ? 'Grupo encontrado' : 'El estudiante no está en ningún grupo', data: grupo || null });
    } catch (error) {
      res.status(500).json({ error: 'Error al obtener el grupo del estudiante' });
    }
  }

  // POST /api/teacher/grupos/:id/estudiantes - Agregar estudiante a grupo
  static addEstudianteToGrupo(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const { id_usuario, nombre, correo } = req.body;
      const grupo = grupos.find(g => g.id_grupo === Number(id));

      if (!grupo) {
        res.status(404).json({ error: 'Grupo no encontrado' });
        return;
      }

      if (grupo.estudiantes.some((e: any) => e.id_usuario === id_usuario)) {
        res.status(400).json({ error: 'El estudiante ya está en el grupo' });
        return;
      }

      grupo.estudiantes.push({ id_usuario, nombre, correo });
      res.json({ message: `Estudiante ${id_usuario} agregado al grupo ${id}`, data: grupo });
    } catch (error) {
      res.status(500).json({ error: 'Error al agregar estudiante' });
    }
  }

  // DELETE /api/teacher/grupos/:id/estudiantes/:id_usuario - Eliminar estudiante
  static removeEstudianteFromGrupo(req: Request, res: Response) {
    try {
      const { id, id_usuario } = req.params;
      const grupo = grupos.find(g => g.id_grupo === Number(id));

      if (!grupo) {
        res.status(404).json({ error: 'Grupo no encontrado' });
        return;
      }

      grupo.estudiantes = grupo.estudiantes.filter((e: any) => String(e.id_usuario) !== id_usuario);
      res.json({ message: `Estudiante ${id_usuario} removido del grupo ${id}`, data: grupo });
    } catch (error) {
      res.status(500).json({ error: 'Error al remover estudiante' });
    }
  }

  // POST /api/teacher/grupos/:id/temas - Asignar tema a grupo
  static assignTemaToGrupo(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const { id_tema, nombre_tema } = req.body;
      const grupo = grupos.find(g => g.id_grupo === Number(id));

      if (!grupo) {
        res.status(404).json({ error: 'Grupo no encontrado' });
        return;
      }

      if (grupo.temas.some((t: any) => t.id_tema === id_tema)) {
        res.status(400).json({ error: 'El tema ya está asignado a este grupo' });
        return;
      }

      grupo.temas.push({ id_tema, nombre_tema });
      res.json({ message: `Tema ${id_tema} asignado al grupo ${id}`, data: grupo });
    } catch (error) {
      res.status(500).json({ error: 'Error al asignar tema' });
    }
  }

  // DELETE /api/teacher/grupos/:id/temas/:id_tema - Remover tema de grupo
  static removeTemaFromGrupo(req: Request, res: Response) {
    try {
      const { id, id_tema } = req.params;
      const grupo = grupos.find(g => g.id_grupo === Number(id));

      if (!grupo) {
        res.status(404).json({ error: 'Grupo no encontrado' });
        return;
      }

      grupo.temas = grupo.temas.filter((t: any) => t.id_tema !== id_tema);
      // Al quitar un tema, también se quitan los ejercicios que dependían de él
      grupo.ejercicios = grupo.ejercicios.filter((e: any) => e.id_tema !== id_tema);
      res.json({ message: `Tema ${id_tema} removido del grupo ${id}`, data: grupo });
    } catch (error) {
      res.status(500).json({ error: 'Error al remover tema' });
    }
  }

  // POST /api/teacher/grupos/:id/ejercicios - Asignar ejercicio (nivel de un tema) a grupo
  static assignEjercicioToGrupo(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const { id_tema, id_nivel, nombre_nivel } = req.body;
      const grupo = grupos.find(g => g.id_grupo === Number(id));

      if (!grupo) {
        res.status(404).json({ error: 'Grupo no encontrado' });
        return;
      }

      const id_ejercicio = `${id_tema}-${id_nivel}`;
      if (grupo.ejercicios.some((e: any) => e.id_ejercicio === id_ejercicio)) {
        res.status(400).json({ error: 'Ese ejercicio ya está asignado a este grupo' });
        return;
      }

      grupo.ejercicios.push({ id_ejercicio, id_tema, id_nivel, nombre_nivel });
      res.json({ message: `Ejercicio ${id_ejercicio} asignado al grupo ${id}`, data: grupo });
    } catch (error) {
      res.status(500).json({ error: 'Error al asignar ejercicio' });
    }
  }

  // DELETE /api/teacher/grupos/:id/ejercicios/:id_ejercicio - Remover ejercicio
  static removeEjercicioFromGrupo(req: Request, res: Response) {
    try {
      const { id, id_ejercicio } = req.params;
      const grupo = grupos.find(g => g.id_grupo === Number(id));

      if (!grupo) {
        res.status(404).json({ error: 'Grupo no encontrado' });
        return;
      }

      grupo.ejercicios = grupo.ejercicios.filter((e: any) => e.id_ejercicio !== id_ejercicio);
      res.json({ message: `Ejercicio ${id_ejercicio} removido del grupo ${id}`, data: grupo });
    } catch (error) {
      res.status(500).json({ error: 'Error al remover ejercicio' });
    }
  }
}
