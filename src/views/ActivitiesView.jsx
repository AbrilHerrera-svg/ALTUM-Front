import React, { useState } from 'react';
import '../App.css';

// Base de preguntas sencillas (ejemplo ESTO DEBE DE VENIR DE SU BASE DE DATOS)
const QUESTIONS = {
  easy: [
    {
      id: 1,
      question: '¿Cuánto es 5 + 3?',
      options: ['6', '7', '8', '9'],
      correct: '8',
      tip: '¡Cuenta con tus deditos! ✋👍'
    },
    {
      id: 2,
      question: '¿Cuánto es 10 - 4?',
      options: ['4', '5', '6', '7'],
      correct: '6',
      tip: 'Si tienes 10 manzanas y te comes 4... 🍎'
    },
    {
      id: 3,
      question: '¿Cuánto es 2 + 7?',
      options: ['8', '9', '10', '11'],
      correct: '9',
      tip: 'Empieza en el 7 y suma 2 más 🚀'
    }
  ],
  hard: [
    {
      id: 1,
      question: '¿Cuánto es 6 x 7?',
      options: ['36', '42', '48', '40'],
      correct: '42',
      tip: 'Es lo mismo que sumar seis veces siete ⚡'
    },
    {
      id: 2,
      question: '¿Cuánto es 24 ÷ 4?',
      options: ['6', '8', '4', '12'],
      correct: '6',
      tip: '¿Qué número multiplicado por 4 da 24? 🔍'
    },
    {
      id: 3,
      question: '¿Cuánto es 9 x 8?',
      options: ['70', '72', '81', '64'],
      correct: '72',
      tip: '¡Una de las multiplicaciones más grandes de la tabla! 🏆'
    }
  ]
};

export default function ActivitiesView({ level, onBack }) {
  // AVANCE: En lugar de un objeto estático, usar un fetch/useEffect para cargar las preguntas desde su API/Base de datos
  const questionsList = QUESTIONS[level] || QUESTIONS.easy;
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [isCorrect, setIsCorrect] = useState(null);
  const [score, setScore] = useState(0);
  const [completed, setCompleted] = useState(false);

  const currentQuestion = questionsList[currentIndex];
  const progressPercent = ((currentIndex) / questionsList.length) * 100;

  const handleOptionClick = (option) => {
    if (selectedOption !== null) return; // Evitar múltiples clics
    setSelectedOption(option);

    const correct = option === currentQuestion.correct;
    setIsCorrect(correct);

    // AVANCE: Aquí se puede disparar un efecto de sonido (ej: correcto.mp3 o incorrecto.mp3)
    if (correct) {
      setScore(score + 1);
    }
  };

  const handleNext = () => {
    setSelectedOption(null);
    setIsCorrect(null);

    if (currentIndex + 1 < questionsList.length) {
      setCurrentIndex(currentIndex + 1);
    } else {
      // AVANCE: Enviar el score final ({score}) y nivel completado a la base de datos mediante una API
      setCompleted(true);
    }
  };

  const handleRestart = () => {
    setCurrentIndex(0);
    setSelectedOption(null);
    setIsCorrect(null);
    setScore(0);
    setCompleted(false);
  };

  // Pantalla de Felicidades al terminar las preguntas
  if (completed) {
    return (
      <div className="play-card activity-container" style={{ animation: 'slideUp 0.5s ease-out' }}>
        <div className="mascot-helper" style={{ fontSize: '4rem', marginBottom: '10px' }}>
          🏆🎉
        </div>
        <h2 style={{ fontSize: '2rem', fontWeight: '800', margin: '10px 0' }}>
          ¡Actividad Completada!
        </h2>
        <p style={{ fontSize: '1.1rem', color: 'var(--text-muted)', marginBottom: '25px' }}>
          Lo hiciste genial. Respondiste correctamente <strong>{score} de {questionsList.length}</strong> preguntas.
        </p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
          <button type="button" className="btn-3d btn-success" onClick={handleRestart}>
            ¡Volver a Jugar! 🔄
          </button>
          <button type="button" className="btn-3d btn-secondary" onClick={onBack}>
            Ir al Menú de Niveles ➔
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="activity-container">
      {/* Cabecera con Barra de Progreso */}
      <div className="activity-header">
        <button
          type="button"
          className="btn-close"
          onClick={onBack}
          title="Regresar al menú"
        >
          ✖
        </button>
        <div className="progress-bar-container">
          <div
            className={`progress-bar-fill ${level === 'easy' ? 'easy-progress' : 'hard-progress'}`}
            style={{ width: `${progressPercent || 5}%` }}
          />
        </div>
        <span style={{ fontWeight: '700', color: 'var(--text-muted)', fontSize: '0.9rem' }}>
          {currentIndex + 1}/{questionsList.length}
        </span>
      </div>

      {/* Pregunta del Robot Mascot */}
      <div className="question-section">
        <div className="mascot-helper">🤖</div>
        <div className="question-bubble">
          {currentQuestion.question}
        </div>
        <p style={{ fontSize: '0.95rem', color: 'var(--text-muted)', marginTop: '10px', fontStyle: 'italic' }}>
          Pista: {currentQuestion.tip}
        </p>
      </div>

      {/* Rejilla de Opciones */}
      <div className="options-grid">
        {currentQuestion.options.map((option, index) => {
          let cardStyle = {};
          if (selectedOption === option) {
            cardStyle = isCorrect
              ? { borderColor: 'var(--success)', backgroundColor: '#effaf0', color: 'var(--success)' }
              : { borderColor: 'var(--coral)', backgroundColor: '#fff5f5', color: 'var(--coral)' };
          }

          return (
            <div
              key={index}
              className="option-card"
              style={cardStyle}
              onClick={() => handleOptionClick(option)}
            >
              {option}
            </div>
          );
        })}
      </div>

      {/* Feedback de Respuesta */}
      {selectedOption !== null && (
        <div
          style={{
            padding: '20px',
            borderRadius: '20px',
            marginBottom: '25px',
            backgroundColor: isCorrect ? '#eafaf1' : '#fff0f2',
            border: `2px solid ${isCorrect ? '#c7f3d6' : '#ffd0d6'}`,
            textAlign: 'center',
            animation: 'pulse-soft 0.5s ease-in-out'
          }}
        >
          <span style={{
            fontSize: '1.2rem',
            fontWeight: '700',
            color: isCorrect ? 'var(--success)' : 'var(--coral)',
            display: 'block',
            marginBottom: '10px'
          }}>
            {isCorrect ? '¡Excelente trabajo! 🎉 Correcto.' : '¡Casi! Sigue intentándolo 💪'}
          </span>
          <button
            type="button"
            className={`btn-3d ${isCorrect ? 'btn-success' : 'btn-coral'}`}
            onClick={handleNext}
            style={{ maxWidth: '180px', padding: '10px 20px', fontSize: '1rem' }}
          >
            Continuar ➔
          </button>
        </div>
      )}
    </div>
  );
}
