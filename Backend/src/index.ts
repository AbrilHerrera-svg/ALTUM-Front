import express from 'express';
import cors from 'cors';
import usuariosRoutes from './routes/usuario.routes';

const app = express();
const PORT = 3000;

// Middlewares globales
app.use(cors()); // <-- Indispensable para conectar con tu React App sin errores de origen cruzado
app.use(express.json()); // Permite a express entender peticiones JSON body

// Enrutador de la API con prefijo semántico
app.use('/api/usuarios', usuariosRoutes);

// Arranque de la aplicación
app.listen(PORT, () => {
  console.log(`🚀 Servidor Express (Memoria Volátil) corriendo en: http://localhost:${PORT}`);
});
// Dentro de src/index.ts

// 📋 Respuestas correctas
const EXERCISE_ANSWERS: Record<string, string[][]> = {
  proportionality: [
    ['$30', '4 tazas', '300 km', '$21'],
    ['18', '25', '150', '4'],
    ['100', '20', '35', '90']
  ]
};

// 🎒 Progreso temporal en memoria
const alumnosProgreso: Record<string, { puntosTotales: number; nivelesCompletados: string[] }> = {
  "Melina": { puntosTotales: 0, nivelesCompletados: [] }
};

// 🛣️ Tu nuevo endpoint pegado junto a tus otras rutas
app.post('/api/ejercicios/verificar', (req, res) => {
  const { alumnoNombre, topicId, levelIndex, exerciseIndex, respuestaUsuario } = req.body;

  if (!alumnoNombre || !topicId || levelIndex === undefined || exerciseIndex === undefined || !respuestaUsuario) {
    return res.status(400).json({ error: 'Faltan datos requeridos.' });
  }

  if (!alumnosProgreso[alumnoNombre]) {
    alumnosProgreso[alumnoNombre] = { puntosTotales: 0, nivelesCompletados: [] };
  }
  const alumno = alumnosProgreso[alumnoNombre];

  let esCorrecto = false;
let respuestaCorrectaServidor: string = "";

  try {
    // 1. Validamos que el tema y el nivel existan antes de buscar el ejercicio
    if (EXERCISE_ANSWERS[topicId] && EXERCISE_ANSWERS[topicId][levelIndex]) {
      respuestaCorrectaServidor = EXERCISE_ANSWERS[topicId][levelIndex][exerciseIndex];
    }

    if (respuestaCorrectaServidor) {
      // 2. Función de limpieza
      const limpiar = (txt: string) => txt.trim().toLowerCase().replace(/\s+/g, '');
      
      // 3. Comparación segura
      esCorrecto = limpiar(respuestaCorrectaServidor) === limpiar(respuestaUsuario);
    } else {
      return res.status(404).json({ error: 'Ejercicio no encontrado en las coordenadas.' });
    }
  } catch (error) {
    return res.status(500).json({ error: 'Error interno al verificar la respuesta.' });
  }

  // 🔍 MONITOR EN LA TERMINAL (Revisa tu consola de Node para auditar el clic)
  console.log(`\n--- 🛰️ AUDITORÍA DE EJERCICIO ---`);
  console.log(`Alumno: ${alumnoNombre} | Tema: ${topicId} | Nivel: ${levelIndex} | Ejercicio: ${exerciseIndex}`);
  console.log(`Recibido del Front: "${respuestaUsuario}"`);
  console.log(`Esperado en el Back: "${respuestaCorrectaServidor}"`);
  console.log(`¿Coinciden?: ${esCorrecto ? '✅ SÍ' : '❌ NO'}`);
  console.log(`---------------------------------\n`);

  let puntosGanados = 0;
  if (esCorrecto) {
    puntosGanados = 10;
    alumno.puntosTotales += puntosGanados;

    if (exerciseIndex === 3) {
      const nivelClave = `${topicId}-${levelIndex}`;
      if (!alumno.nivelesCompletados.includes(nivelClave)) {
        alumno.nivelesCompletados.push(nivelClave);
        alumno.puntosTotales += 50; 
      }
    }
  }

  res.json({
    esCorrecto,
    puntosGanados,
    puntosTotalesAlumno: alumno.puntosTotales,
    nivelesCompletados: alumno.nivelesCompletados
  });
});