// ============================================================
// LevelView.tsx — PANTALLA DEL JUEGO (PREGUNTAS)
// Aquí el alumno responde preguntas de opción múltiple.
// ============================================================

import { useState, useEffect, useCallback, useMemo } from 'react';
import CabeceraJuego from '../components/GameHeader';
import BarraProgreso from '../components/ProgressBar';
import MensajeAnimo  from '../components/EncouragementMessage';
import ConfirmModal  from '../components/ConfirmModal';
import '../components/ConfirmModal.css';
import { ENCOURAGEMENTS_WRONG, ENCOURAGEMENTS_CORRECT, LEVEL_NAMES } from '../data/topics';
import { obtenerEjercicios, verificarRespuesta } from '../services/api';
import type { Topic, EncouragementType, Exercise } from '../types';
import './LevelView.css';

const MAX_LIVES = 3;

// ── ARREGLO DE COLORES DE LETRAS ────────────────────────────
// Un arreglo simple de 4 strings (uno por cada opción A, B, C, D).
// Se accede con [i] donde i es 0, 1, 2 o 3.
//   LETTER_COLORS[0] → '#7c3aed' (morado para A)
//   LETTER_COLORS[1] → '#0891b2' (azul para B)
//   LETTER_COLORS[2] → '#d97706' (naranja para C)
//   LETTER_COLORS[3] → '#db2777' (rosa para D)
const LETTER_COLORS = ['#7c3aed', '#0891b2', '#d97706', '#db2777'];

// Función que elige un elemento aleatorio de cualquier arreglo.
// Math.random() → número entre 0 y 0.999...
// * arr.length  → escala al tamaño del arreglo
// Math.floor()  → redondea hacia abajo para obtener un índice válido
// Ejemplo con arreglo de 8 frases: Math.floor(0.65 * 8) = Math.floor(5.2) = 5
function elegir<T>(arr: T[]): T { return arr[Math.floor(Math.random() * arr.length)]; }

// Revuelve un arreglo (Fisher-Yates), sin modificar el original
function revolver<T>(arr: T[]): T[] {
  const copia = [...arr];
  for (let i = copia.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copia[i], copia[j]] = [copia[j], copia[i]];
  }
  return copia;
}

// Empareja cada pregunta con su posición ORIGINAL en la lista que manda el
// backend (ordenada por id_ejercicio) — esa posición es la que hay que
// mandarle a verificarRespuesta(), sin importar en qué orden se muestre
// en pantalla (que ahora es aleatorio).
interface ExerciseConIndice { exercise: Exercise; originalIndex: number; }

interface EncouragementState { message: string; type: EncouragementType; }

interface Props {
  topic:      Topic;
  levelIdx:   number;
  userGrade:  string;
  onComplete: (stars: number) => void;
  onBack:     () => void;
}

export default function VistaNivel({ topic, levelIdx, userGrade, onComplete, onBack }: Props) {

  // exercises es un ARREGLO de preguntas, cada una emparejada con su
  // posición ORIGINAL en la base de datos. Se revuelve UNA SOLA VEZ al
  // cargar el nivel (no en cada pregunta), así el orden de las preguntas
  // es distinto cada vez que entras, tanto para alumnos autónomos como
  // los que están en grupo — es lo mismo LevelView.tsx para todos.
  const [exercises,     setExercises]     = useState<ExerciseConIndice[]>([]);
  const [loading,       setLoading]       = useState(true);
  const [errorMsg,      setErrorMsg]      = useState('');
  const [currentQ,      setCurrentQ]      = useState(0);           // índice de pregunta actual (0-3)
  const [lives,         setLives]         = useState(MAX_LIVES);
  const [totalWrong,    setTotalWrong]    = useState(0);
  const [selected,      setSelected]      = useState<string | null>(null);
  const [showHint,      setShowHint]      = useState(false);
  const [encouragement, setEncouragement] = useState<EncouragementState | null>(null);
  const [gameOver,      setGameOver]      = useState(false);
  const [showConnError, setShowConnError] = useState(false);
  const [showCorrect,   setShowCorrect]   = useState(false);

  const levelName = LEVEL_NAMES[topic.id]?.[levelIdx] ?? `Nivel ${levelIdx + 1}`;

  // ── DESCARGA DE PREGUNTAS DEL BACKEND ───────────────────────
  useEffect(() => {
    setLoading(true);
    setErrorMsg('');
    // Incluye el grado del usuario para obtener ejercicios específicos
    obtenerEjercicios(topic.id, levelIdx, userGrade)
      .then((data: any) => {
        // data es un objeto con: { grade, tema, nivel, ejercicios: [...] }
        // Extraemos el arreglo de ejercicios (en el orden del backend)
        const todos: Exercise[] = data.ejercicios || data;

        // Emparejamos cada pregunta con su índice original ANTES de
        // revolver, para no perder la referencia correcta.
        const conIndices: ExerciseConIndice[] = todos.map((ex, i) => ({ exercise: ex, originalIndex: i }));

        setExercises(revolver(conIndices));
        setLoading(false);
      })
      .catch((err) => {
        setErrorMsg(err.message || 'No se pudo obtener la misión estelar.');
        setLoading(false);
      });
  }, [topic.id, levelIdx, userGrade]);

  // Acceso directo a la pregunta actual del arreglo usando el índice
  // exercises[0] = primera pregunta (ya revuelta), exercises[1] = segunda, etc.
  const exercise = exercises[currentQ]?.exercise;

  // ── ORDEN ALEATORIO DE LAS RESPUESTAS ────────────────────────
  // Se revuelve cada vez que cambia la pregunta actual (currentQ), no en
  // cada render — así el orden se queda quieto mientras respondes esta
  // pregunta, pero cambia la próxima vez que entres (o avances). No afecta
  // en nada a la base de datos: "correct" se sigue comparando por TEXTO,
  // no por posición, así que el admin no tiene que hacer nada distinto.
  const shuffledOptions = useMemo(() => {
    if (!exercise) return [];
    return revolver(exercise.options);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentQ, exercise?.question]);

  // ── FUNCIÓN: PROCESAR RESPUESTA DEL ALUMNO ──────────────────
  const Responder = useCallback(async (opt: string) => {

    // ── IF #2: ¿Ya respondió o hay mensaje activo? ───────────
    // selected !== null → ya eligió una opción
    // encouragement     → hay un mensaje de ánimo mostrándose
    // showCorrect       → se está mostrando la respuesta correcta
    // Si cualquiera es true, ignoramos el clic (no hacemos nada)
    if (selected !== null || encouragement || showCorrect) return;

    setSelected(opt); // marca visualmente la opción elegida

    try {
      const usuarioActual = localStorage.getItem('usuarioNombre') || 'Invitado';

      const data = await verificarRespuesta({
        alumnoNombre:     usuarioActual,
        userGrade:        userGrade,
        topicId:          topic.id,
        levelIndex:       levelIdx,
        exerciseIndex:    exercises[currentQ]?.originalIndex ?? currentQ,
        respuestaUsuario: opt,
      });

      // ── IF #3: ¿La respuesta fue correcta? ───────────────
      if (data.esCorrecto) {
        setShowCorrect(true);
        // elegir() elige una frase aleatoria del ARREGLO ENCOURAGEMENTS_CORRECT
        setEncouragement({ message: elegir(ENCOURAGEMENTS_CORRECT), type: 'correct' });
      } else {
        // Si fue incorrecta: restamos una vida
        const newLives = lives - 1;
        setLives(newLives);
        setTotalWrong(w => w + 1); // w => w + 1 incrementa el valor anterior en 1

        // ── IF #4: ¿Se acabaron las vidas? ───────────────────
        if (newLives <= 0) {
          setGameOver(true); // 0 vidas → pantalla de game over
        } else {
          // Todavía quedan vidas → mensaje de ánimo de los incorrectos
          setEncouragement({ message: elegir(ENCOURAGEMENTS_WRONG), type: 'wrong' });
        }
      }

    } catch (error) {
      console.error("Error al conectar con el servidor:", error);
      setShowConnError(true);
      setSelected(null);
    }
  }, [selected, encouragement, showCorrect, topic.id, levelIdx, currentQ, lives, exercises]);

  // ── FUNCIÓN: CONTINUAR DESPUÉS DEL MENSAJE DE ÁNIMO ─────────
  const TerminarMensaje = useCallback(() => {
    setEncouragement(null);
    setShowCorrect(false);
    setSelected(null);
    setShowHint(false);

    // Avanza a la siguiente pregunta SIEMPRE — sea que la anterior se
    // haya respondido bien o mal. Al fallar, ya se restó una vida en
    // Responder(); aquí simplemente no te deja atorado en la misma
    // pregunta, sigues adelante con la siguiente.
    const next = currentQ + 1;

    // ── ¿Ya terminó todas las preguntas? ──────────
    // next >= exercises.length → ya no hay más preguntas en el arreglo
    if (next >= exercises.length) {
      // Calcula estrellas según errores totales:
      //   totalWrong === 0       → 3 estrellas (perfecto)
      //   totalWrong <= 2        → 2 estrellas (casi perfecto)
      //   totalWrong > 2         → 1 estrella  (lo completó con errores)
      onComplete(totalWrong === 0 ? 3 : totalWrong <= 2 ? 2 : 1);
      // ↑ Doble ternario anidado: condición1 ? valor1 : condición2 ? valor2 : valor3
    } else {
      setCurrentQ(next);
    }
  }, [currentQ, totalWrong, onComplete, exercises.length]);

  // Reinicia todos los estados para volver a empezar el nivel desde cero
  const Reintentar = () => {
    setCurrentQ(0); setLives(MAX_LIVES); setTotalWrong(0);
    setSelected(null); setShowHint(false); setGameOver(false);
    setShowCorrect(false); setEncouragement(null);
  };

  // ── IFs DE PANTALLAS DE ESTADO ──────────────────────────────
  // ── IF #7: ¿Todavía cargando? ────────────────────────────────
  if (loading)             return <div className="text-white text-center mt-20 text-xl font-bold animate-pulse">🛸 Conectando con la base de datos estelar...</div>;
  // ── IF #8: ¿Hubo error de red? ───────────────────────────────
  if (errorMsg)            return <div className="text-red-400 text-center mt-20 font-semibold">❌ Error: {errorMsg}</div>;
  // ── IF #9: ¿El arreglo de preguntas está vacío? ──────────────
  if (exercises.length === 0) return <div className="text-white text-center mt-20">No hay misiones espaciales en este cuadrante.</div>;
  // ── IF #9b: ¿La pregunta actual no existe? (protección extra, no debería pasar) ──
  if (!exercise) return <div className="text-white text-center mt-20">🛰️ Cargando la siguiente pregunta...</div>;

  // ── IF #10: ¿Se acabaron las vidas? ──────────────────────────
  if (gameOver) {
    return (
      <div className="lv-backdrop">
        <div className="lv-gameover">
          <div className="lv-go-icon">💫</div>
          <h2 className="lv-go-title">¡Se acabaron las vidas!</h2>
          <p className="lv-go-sub">¡No te rindas! Los errores nos ayudan a aprender.</p>
          <button className="lv-go-btn lv-go-btn--retry" onClick={Reintentar}>🔄 Intentar de nuevo</button>
          <button className="lv-go-btn lv-go-btn--back"  onClick={onBack}>← Volver al mapa</button>
        </div>
      </div>
    );
  }

  // ── PANTALLA PRINCIPAL DEL JUEGO ─────────────────────────────
  return (
    <div className="lv-backdrop">
      <CabeceraJuego
        title={levelName}
        subtitle={`Nivel ${levelIdx + 1} · ${topic.title}`}
        lives={lives}
        onBack={onBack}
      />

      <div className="lv-content" style={{ '--topic-color': topic.color, '--topic-gradient': topic.gradient } as React.CSSProperties}>
        <div className="lv-progress">
          <BarraProgreso current={currentQ} total={exercises.length} color={topic.color} />
        </div>

        <div className="lv-card" style={{ borderTopColor: topic.color }}>
          <div className="lv-q-badge" style={{ background: topic.gradient }}>
            {topic.emoji} Pregunta {currentQ + 1}/{exercises.length}
          </div>
          <p className="lv-question">{exercise.question}</p>
          {/* ── IF #11: ¿Mostrar la pista? ──────────────────── */}
          {showHint && (
            <div className="lv-hint">💡 <span>{exercise.tip}</span></div>
          )}
        </div>

        {/* ── Renderizar las opciones de respuesta ── */}
        {/* exercise.options es el ARREGLO de 4 opciones de la pregunta actual */}
        {/* .map((opt, i) → opt es el texto de la opción, i es su índice 0-3 */}
        <div className="lv-options">
          {shuffledOptions.map((opt, i) => {

            // Construimos la clase CSS del botón dinámicamente según el estado
            let cls = 'lv-opt'; // clase base siempre presente

            // ── IF #12: ¿Ya se seleccionó alguna opción? ─────
            if (selected !== null) {
              // ── IF #13: ¿Esta opción es la correcta Y la respuesta fue correcta? ─
              if (showCorrect && opt === exercise.correct) {
                cls += ' lv-opt--correct'; // pinta de verde
              }
              // ── IF #14: ¿Esta opción fue la seleccionada Y es incorrecta? ─────
              else if (opt === selected && opt !== exercise.correct) {
                cls += ' lv-opt--wrong';   // pinta de rojo
              }
            }

            // true cuando NO se ha seleccionado nada → botones en colores normales
            const isNeutral = selected === null;

            return (
              <button
                key={i}
                className={cls}
                onClick={() => Responder(opt)}
                // disabled bloquea el botón después de responder (evita doble clic)
                disabled={selected !== null}
                // Solo aplica el color de letra cuando no hay selección
                style={isNeutral ? { '--letter-bg': LETTER_COLORS[i] } as React.CSSProperties : {}}
              >
                {/* Accedemos al arreglo de letras con [i]: 0→A, 1→B, 2→C, 3→D */}
                <span className="lv-opt-letter">{['A', 'B', 'C', 'D'][i]}</span>
                <span className="lv-opt-text">{opt}</span>

                {/* ── IF #15: Mostrar ✓ en la respuesta correcta ── */}
                {showCorrect && opt === exercise.correct && <span className="lv-opt-icon">✓</span>}
                {/* ── IF #16: Mostrar ✗ en la respuesta incorrecta elegida ── */}
                {!showCorrect && opt === selected && <span className="lv-opt-icon">✗</span>}
              </button>
            );
          })}
        </div>

        {/* ── IF #17: Mostrar el botón de pista ── */}
        {/* Solo aparece si: no se muestra pista Y no se ha respondido todavía */}
        {!showHint && selected === null && (
          <button className="lv-hint-btn" onClick={() => setShowHint(true)}>💡 Ver pista</button>
        )}
      </div>

      {/* ── IF #18: Mostrar mensaje de ánimo ── */}
      {/* Solo aparece si encouragement tiene un valor (no es null) */}
      {encouragement && (
        <MensajeAnimo
          message={encouragement.message}
          type={encouragement.type}
          onDone={TerminarMensaje}
        />
      )}

      <ConfirmModal
        open={showConnError}
        title="Error de conexión"
        message="Hubo un error de conexión con la base de datos estelar. 🛰️ Revisa tu internet e intenta de nuevo."
        confirmText="Entendido"
        onConfirm={() => setShowConnError(false)}
      />
    </div>
  );
}
