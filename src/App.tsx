import { useState, useEffect } from 'react';
import VistaLogin from './views/LoginView';
import VistaPrincipal from './views/DashboardView';
import VistaConstelacion from './views/ConstellationView';
import VistaNivel from './views/LevelView';
import VistaResultado from './views/ResultView';
import VistaPerfil from './views/ProfileView';
import type { Topic, Progress, ViewName } from './types';

// URL de tu API en Express (BackEnd)
const API_URL = 'http://localhost:3000/api/usuarios';

// Mantener la carga local temporal solo para el progreso de estrellas de los niveles
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
  
  // Estados del usuario sincronizados con el BackEnd
  const [userId, setUserId] = useState<number | null>(null);
  const [userName, setUserName] = useState('');
  const [userGrade, setUserGrade] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [userAvatar, setUserAvatar] = useState('👨‍🚀');
  
  const [selectedTopic, setSelectedTopic] = useState<Topic | null>(null);
  const [selectedLevel, setSelectedLevel] = useState<number | null>(null);
  const [lastStars, setLastStars] = useState(0);
  const [progress, setProgress] = useState<Progress>(cargarProgreso);

  // REQUISITO 3 y 8: Cargar datos iniciales del BackEnd si existieran al arrancar
  useEffect(() => {
    fetch(API_URL)
      .then((res) => res.json())
      .then((data) => {
        if (data && data.length > 0) {
          // Si ya hay un usuario registrado en el arreglo del BackEnd, lo cargamos
          const ultimoUsuario = data[data.length - 1];
          setUserId(ultimoUsuario.id);
          setUserName(ultimoUsuario.nombre);
          setUserGrade(ultimoUsuario.grado);
          setUserEmail(ultimoUsuario.correo);
          setUserAvatar(ultimoUsuario.avatar);
        }
      })
      .catch((err) => console.error('Error conectando al BackEnd:', err));
  }, []);

  // REQUISITO 7 y 9: Operación CREATE (POST) al iniciar sesión / registrarse
  const alIniciarSesion = async (name: string, grade: string, email: string, avatar: string) => {
    try {
      const respuesta = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          nombre: name,
          grado: grade,
          correo: email,
          avatar: avatar || '👨‍🚀'
        }),
      });

      const datos = await respuesta.json();
      
      if (respuesta.ok) {
        // Guardamos en el estado de React los datos que nos devolvió el BackEnd (incluyendo el ID generado)
        setUserId(datos.usuario.id);
        setUserName(datos.usuario.nombre);
        setUserGrade(datos.usuario.grado);
        setUserEmail(datos.usuario.correo);
        setUserAvatar(datos.usuario.avatar);
        setView('dashboard');
      } else {
        console.error('Error del servidor:', datos.error);
      }
    } catch (error) {
      console.error('Error de red al intentar registrar usuario:', error);
    }
  };

  // REQUISITO 7 y 9: Operación UPDATE (PUT) al modificar el perfil
  const alActualizarPerfil = async ({ name, grade, avatar }: { name: string; grade: string; avatar: string }) => {
    if (!userId) return;

    try {
      const respuesta = await fetch(`${API_URL}/${userId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          nombre: name,
          grado: grade,
          correo: userEmail, // Mantenemos el mismo correo
          avatar: avatar
        }),
      });

      const datos = await respuesta.json();

      if (respuesta.ok) {
        setUserName(datos.usuario.nombre);
        setUserGrade(datos.usuario.grado);
        setUserAvatar(datos.usuario.avatar);
      } else {
        console.error('Error al actualizar en BackEnd:', datos.error);
      }
    } catch (error) {
      console.error('Error de red al actualizar perfil:', error);
    }
  };

  // REQUISITO 7 y 9: Operación DELETE (DELETE) al reiniciar o eliminar cuenta
  const alEliminarCuenta = async () => {
    if (!userId) return;

    try {
      const respuesta = await fetch(`${API_URL}/${userId}`, {
        method: 'DELETE',
      });

      if (respuesta.ok) {
        alCerrarSesion();
      } else {
        console.error('Error al eliminar en el BackEnd');
      }
    } catch (error) {
      console.error('Error de red al eliminar cuenta:', error);
    }
  };

  // Lógica local del juego y navegación interna
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
    setUserId(null);
    setUserName('');
    setUserGrade('');
    setUserEmail('');
    setUserAvatar('👨‍🚀');
    setSelectedTopic(null);
    setSelectedLevel(null);
    setView('login');
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
          onLogout={alEliminarCuenta} // Mapeado al DELETE en el backend
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