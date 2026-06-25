import { useState, useCallback } from 'react';
import CabeceraJuego from '../components/GameHeader';
import BarraProgreso from '../components/ProgressBar';
import MensajeAnimo from '../components/EncouragementMessage';
import { EXERCISES } from '../data/exercises';
import { ENCOURAGEMENTS_WRONG, ENCOURAGEMENTS_CORRECT, LEVEL_NAMES } from '../data/topics';
import type { Topic, EncouragementType } from '../types';
import './LevelView.css';

const MAX_LIVES = 3;
const EXERCISES_PER_LEVEL = 4;
const LETTER_COLORS = ['#7c3aed', '#0891b2', '#d97706', '#db2777'];

function elegir<T>(arr: T[]): T { return arr[Math.floor(Math.random() * arr.length)]; }

interface EncouragementState { message: string; type: EncouragementType; }

interface Props {
  topic: Topic;
  levelIdx: number;
  onComplete: (stars: number) => void;
  onBack: () => void;
}

export default function VistaNivel({ topic, levelIdx, onComplete, onBack }: Props) {
  const exercises = EXERCISES[topic.id]?.[levelIdx] ?? [];
  const levelName = LEVEL_NAMES[topic.id]?.[levelIdx] ?? `Nivel ${levelIdx + 1}`;

  const [currentQ, setCurrentQ] = useState(0);
  const [lives, setLives] = useState(MAX_LIVES);
  const [totalWrong, setTotalWrong] = useState(0);
  const [selected, setSelected] = useState<string | null>(null);
  const [showHint, setShowHint] = useState(false);
  const [encouragement, setEncouragement] = useState<EncouragementState | null>(null);
  const [gameOver, setGameOver] = useState(false);
  const [showCorrect, setShowCorrect] = useState(false);

  const exercise = exercises[currentQ];

  const Responder = useCallback((opt: string) => {
    if (selected !== null || encouragement || showCorrect) return;
    setSelected(opt);
    if (opt === exercise.correct) {
      setShowCorrect(true);
      setEncouragement({ message: elegir(ENCOURAGEMENTS_CORRECT), type: 'correct' });
    } else {
      const newLives = lives - 1;
      setLives(newLives);
      setTotalWrong(w => w + 1);
      if (newLives <= 0) { setGameOver(true); }
      else { setEncouragement({ message: elegir(ENCOURAGEMENTS_WRONG), type: 'wrong' }); }
    }
  }, [selected, encouragement, showCorrect, exercise, lives]);

  const TerminarMensaje = useCallback(() => {
    setEncouragement(null);
    if (showCorrect) {
      const next = currentQ + 1;
      if (next >= EXERCISES_PER_LEVEL) {
        onComplete(totalWrong === 0 ? 3 : totalWrong <= 2 ? 2 : 1);
      } else {
        setCurrentQ(next); setSelected(null); setShowHint(false); setShowCorrect(false);
      }
    } else {
      setSelected(null); setShowHint(false);
    }
  }, [showCorrect, currentQ, totalWrong, onComplete]);

  const Reintentar = () => {
    setCurrentQ(0); setLives(MAX_LIVES); setTotalWrong(0);
    setSelected(null); setShowHint(false); setGameOver(false);
    setShowCorrect(false); setEncouragement(null);
  };

  if (gameOver) {
    return (
      <div className="lv-backdrop">
        <div className="lv-gameover">
          <div className="lv-go-icon">💫</div>
          <h2 className="lv-go-title">¡Se acabaron las vidas!</h2>
          <p className="lv-go-sub">¡No te rindas! Los errores nos ayudan a aprender. ¡Inténtalo de nuevo!</p>
          <button className="lv-go-btn lv-go-btn--retry" onClick={Reintentar}>🔄 Intentar de nuevo</button>
          <button className="lv-go-btn lv-go-btn--back" onClick={onBack}>← Volver al mapa</button>
        </div>
      </div>
    );
  }

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
          <BarraProgreso current={currentQ} total={EXERCISES_PER_LEVEL} color={topic.color} />
        </div>

        <div className="lv-card" style={{ borderTopColor: topic.color }}>
          <div className="lv-q-badge" style={{ background: topic.gradient }}>
            {topic.emoji} Pregunta {currentQ + 1}/{EXERCISES_PER_LEVEL}
          </div>
          <p className="lv-question">{exercise.question}</p>
          {showHint && (
            <div className="lv-hint">💡 <span>{exercise.tip}</span></div>
          )}
        </div>

        <div className="lv-options">
          {exercise.options.map((opt, i) => {
            let cls = 'lv-opt';
            if (selected !== null) {
              if (showCorrect && opt === exercise.correct) cls += ' lv-opt--correct';
              else if (opt === selected && opt !== exercise.correct) cls += ' lv-opt--wrong';
            }
            const isNeutral = selected === null;
            return (
              <button
                key={i}
                className={cls}
                onClick={() => Responder(opt)}
                disabled={selected !== null}
                style={isNeutral ? { '--letter-bg': LETTER_COLORS[i] } as React.CSSProperties : {}}
              >
                <span className="lv-opt-letter">{['A','B','C','D'][i]}</span>
                <span className="lv-opt-text">{opt}</span>
                {showCorrect && opt === exercise.correct && <span className="lv-opt-icon">✓</span>}
                {!showCorrect && opt === selected && <span className="lv-opt-icon">✗</span>}
              </button>
            );
          })}
        </div>

        {!showHint && selected === null && (
          <button className="lv-hint-btn" onClick={() => setShowHint(true)}>💡 Ver pista</button>
        )}
      </div>

      {encouragement && (
        <MensajeAnimo
          message={encouragement.message}
          type={encouragement.type}
          onDone={TerminarMensaje}
        />
      )}
    </div>
  );
}
