import { useState } from 'react';
import VistaLogin from './views/LoginView';
import VistaPrincipal from './views/DashboardView';
import VistaConstelacion from './views/ConstellationView';
import VistaNivel from './views/LevelView';
import VistaResultado from './views/ResultView';
import VistaPerfil from './views/ProfileView';
import type { Topic, Progress, ViewName } from './types';

const PROGRESS_KEY = 'altum_progress';

function cargarProgreso(): Progress {
  try {
    return JSON.parse(localStorage.getItem(PROGRESS_KEY) || '{}') as Progress;
  } catch {
    return {};
  }
}

function guardarProgreso(p: Progress): void {
  localStorage.setItem(PROGRESS_KEY, JSON.stringify(p));
}

export default function Aplicacion() {
  const [view, setView] = useState<ViewName>('login');
  const [userName, setUserName] = useState('');
  const [userGrade, setUserGrade] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [userAvatar, setUserAvatar] = useState('👨‍🚀');
  const [selectedTopic, setSelectedTopic] = useState<Topic | null>(null);
  const [selectedLevel, setSelectedLevel] = useState<number | null>(null);
  const [lastStars, setLastStars] = useState(0);
  const [progress, setProgress] = useState<Progress>(cargarProgreso);

  const actualizarProgreso = (topicId: string, levelIdx: number, stars: number) => {
    setProgress(prev => {
      const next: Progress = {
        ...prev,
        [topicId]: {
          ...prev[topicId],
          [levelIdx]: {
            completed: true,
            stars: Math.max(stars, prev[topicId]?.[levelIdx]?.stars ?? 0),
          },
        },
      };
      guardarProgreso(next);
      return next;
    });
  };

  const alIniciarSesion = (name: string, grade: string, email: string, avatar: string) => {
    setUserName(name);
    setUserGrade(grade);
    setUserEmail(email);
    setUserAvatar(avatar || '👨‍🚀');
    setView('dashboard');
  };

  const alSeleccionarTema = (topic: Topic) => {
    setSelectedTopic(topic);
    setView('constellation');
  };

  const alSeleccionarNivel = (levelIdx: number) => {
    setSelectedLevel(levelIdx);
    setView('level');
  };

  const alCompletarNivel = (stars: number) => {
    if (selectedTopic && selectedLevel !== null) {
      actualizarProgreso(selectedTopic.id, selectedLevel, stars);
    }
    setLastStars(stars);
    setView('result');
  };

  const alSiguienteNivel = () => {
    setSelectedLevel(prev => (prev !== null ? prev + 1 : 0));
    setView('level');
  };

  const alCerrarSesion = () => {
    setUserName('');
    setUserGrade('');
    setUserEmail('');
    setUserAvatar('👨‍🚀');
    setSelectedTopic(null);
    setSelectedLevel(null);
    setView('login');
  };

  const alActualizarPerfil = ({ name, grade, avatar }: { name: string; grade: string; avatar: string }) => {
    setUserName(name);
    setUserGrade(grade);
    setUserAvatar(avatar);
  };

  const alReiniciarProgreso = () => {
    const empty: Progress = {};
    setProgress(empty);
    guardarProgreso(empty);
  };

  return (
    <>
      {view === 'login' && (
        <VistaLogin onLogin={alIniciarSesion} />
      )}

      {view === 'dashboard' && (
        <VistaPrincipal
          userName={userName}
          userGrade={userGrade}
          userAvatar={userAvatar}
          progress={progress}
          onSelectTopic={alSeleccionarTema}
          onProfile={() => setView('profile')}
          onLogout={alCerrarSesion}
        />
      )}

      {view === 'profile' && (
        <VistaPerfil
          userName={userName}
          userGrade={userGrade}
          userEmail={userEmail}
          userAvatar={userAvatar}
          progress={progress}
          onBack={() => setView('dashboard')}
          onUpdate={alActualizarPerfil}
          onLogout={alCerrarSesion}
          onResetProgress={alReiniciarProgreso}
        />
      )}

      {view === 'constellation' && selectedTopic && (
        <VistaConstelacion
          topic={selectedTopic}
          progress={progress}
          onSelectLevel={alSeleccionarNivel}
          onBack={() => setView('dashboard')}
        />
      )}

      {view === 'level' && selectedTopic && selectedLevel !== null && (
        <VistaNivel
          topic={selectedTopic}
          levelIdx={selectedLevel}
          onComplete={alCompletarNivel}
          onBack={() => setView('constellation')}
        />
      )}

      {view === 'result' && selectedTopic && selectedLevel !== null && (
        <VistaResultado
          topic={selectedTopic}
          levelIdx={selectedLevel}
          stars={lastStars}
          onNext={alSiguienteNivel}
          onRetry={() => setView('level')}
          onBack={() => setView('constellation')}
        />
      )}
    </>
  );
}
