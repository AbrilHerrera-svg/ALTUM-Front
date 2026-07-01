// ============================================================
// types.ts — DEFINICIONES DE TIPOS DE TYPESCRIPT
//
// Este archivo NO genera código real en el navegador.
// Solo existe para que TypeScript sepa la forma que tienen los
// datos y pueda avisarte si cometes un error (líneas rojas).
//
// Si escribes: progress["numeric"][0].strs (typo)
// TypeScript te avisa: "strs no existe en LevelProgress, quisiste decir stars?"
//
// Hay dos formas de definir tipos:
//   interface → para describir la forma de un OBJETO
//   type      → para describir un valor con opciones limitadas
// ============================================================


// ── INTERFACE TOPIC ──────────────────────────────────────────
// Describe cómo se ve un tema matemático.
// Se usa en: data/topics.ts, DashboardView, ConstellationView, LevelView, ResultView
//
// Ejemplo real de un objeto Topic:
// {
//   id: 'numeric',
//   title: 'Sentido Numérico y Aritmética',
//   emoji: '🔢',
//   planet: '🌑',
//   description: 'Múltiplos, divisores, primos, MCM y MCD',
//   color: '#db2777',
//   gradient: 'linear-gradient(135deg, #db2777, #9d174d)',
//   shadow: 'rgba(219,39,119,0.4)',
//   levelCount: 8
// }
export interface Topic {
  id:          string; // clave única para identificar el tema (ej: 'proportionality')
  title:       string; // nombre completo que se muestra en pantalla
  emoji:       string; // emoji del tema
  planet:      string; // emoji del planeta decorativo
  description: string; // descripción corta de qué temas cubre
  color:       string; // color principal en hexadecimal
  gradient:    string; // gradiente CSS para fondos y badges
  shadow:      string; // color de sombra con opacidad para efectos glow
  levelCount:  number; // cuántos niveles tiene el tema (siempre 8 en esta app)
}


// ── INTERFACE EXERCISE ───────────────────────────────────────
// Describe cómo se ve una pregunta de opción múltiple.
// El backend devuelve un ARREGLO de estos objetos al entrar a un nivel.
// Se usa en: LevelView
//
// Ejemplo real:
// {
//   question: '¿Cuánto es el 50% de 200?',
//   options: ['50', '75', '100', '150'],   ← arreglo de 4 strings
//   correct: '100',                         ← debe coincidir exactamente con una opción
//   tip: '50% significa la mitad. 200 ÷ 2 = ? 🍰'
// }
export interface Exercise {
  question: string;   // texto de la pregunta
  options:  string[]; // arreglo de 4 opciones de respuesta
                      // string[] significa "arreglo de strings"
  correct:  string;   // la respuesta correcta (igual a una de las options)
  tip:      string;   // pista que aparece cuando el alumno pide ayuda
}


// ── INTERFACE LEVELPROGRESS ──────────────────────────────────
// Describe el progreso de UN nivel específico.
// Se usa como valor dentro de TopicProgress.
//
// Ejemplo:
//   { completed: true, stars: 3 }   → nivel completado con 3 estrellas
//   { completed: false, stars: 0 }  → nivel no completado
export interface LevelProgress {
  completed: boolean; // true si el alumno ya terminó el nivel
  stars:     number;  // cuántas estrellas ganó: 1, 2 o 3 (0 si no completado)
}


// ── INTERFACE TOPICPROGRESS ──────────────────────────────────
// Describe el progreso de todos los niveles de UN tema.
//
// [levelIdx: number] es un ÍNDICE DE FIRMA:
// Le dice a TypeScript que este objeto puede tener cualquier número como clave,
// y que el valor de cada clave es un LevelProgress.
//
// Ejemplo de cómo se ve en memoria:
// {
//   0: { completed: true,  stars: 3 },  ← nivel 0: completado con 3 estrellas
//   1: { completed: true,  stars: 2 },  ← nivel 1: completado con 2 estrellas
//   2: { completed: false, stars: 0 },  ← nivel 2: no completado
//   3: { completed: false, stars: 0 },  ← nivel 3: no completado
//   ...hasta el 7
// }
export interface TopicProgress {
  [levelIdx: number]: LevelProgress;
}


// ── INTERFACE PROGRESS ───────────────────────────────────────
// Describe el progreso COMPLETO de un alumno en TODOS los temas.
//
// [topicId: string] es otro índice de firma:
// La clave es el id del tema (string) y el valor es un TopicProgress.
//
// Ejemplo completo del objeto progress de un alumno:
// {
//   "numeric": {                              ← id del tema
//     0: { completed: true,  stars: 3 },
//     1: { completed: true,  stars: 2 }
//   },
//   "statistics": {
//     0: { completed: true,  stars: 1 }
//   },
//   "proportionality": {
//     0: { completed: false, stars: 0 }
//   }
// }
//
// Este objeto se guarda en App.tsx con useState<Progress>({})
// y viaja entre el frontend y el backend constantemente.
export interface Progress {
  [topicId: string]: TopicProgress;
}


// ── INTERFACE USER ───────────────────────────────────────────
// Describe cómo se ve un usuario en el localStorage del navegador.
// Se usa en ProfileView para leer y guardar datos localmente.
//
// Nota: el backend usa la clase Usuario (diferente a esta interface),
// esta interface es solo para el almacenamiento local en el navegador.
export interface User {
  name:     string;
  grade:    string;
  email:    string;
  password: string;
  avatar?:  string; // el ? hace que este campo sea OPCIONAL
                    // puede existir o no, TypeScript no exige que esté
}


// ── TYPE VIEWNAME ────────────────────────────────────────────
// Define las 6 pantallas posibles de la app.
// El | (pipe) significa "O" — ViewName puede ser UNO de estos 6 valores.
//
// Esto permite que TypeScript te avise si escribes una pantalla inexistente:
//   setView('menu')   → ❌ Error: 'menu' no existe en ViewName
//   setView('login')  → ✅ Correcto
//
// Se usa en App.tsx: const [view, setView] = useState<ViewName>('login')
export type ViewName = 'login' | 'dashboard' | 'profile' | 'constellation' | 'level' | 'result';


// ── TYPE STARSIZE ────────────────────────────────────────────
// Define los 3 tamaños posibles para el componente StarDisplay.
// 'sm' = small (pequeño) → en las tarjetas del Dashboard
// 'md' = medium (mediano)
// 'lg' = large (grande)  → en la pantalla de resultados
export type StarSize = 'sm' | 'md' | 'lg';


// ── TYPE ENCOURAGEMENTTYPE ───────────────────────────────────
// Define los 2 tipos de mensaje de ánimo que puede mostrar EncouragementMessage.
// 'correct' → respuesta correcta → frase positiva + color verde
// 'wrong'   → respuesta incorrecta → frase motivacional + color rojo
export type EncouragementType = 'correct' | 'wrong';
