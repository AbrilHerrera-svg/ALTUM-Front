import { useState, useEffect } from 'react';
import VistaLogin from './views/LoginView';
import VistaPrincipal from './views/DashboardView';
import VistaConstelacion from './views/ConstellationView';
import VistaNivel from './views/LevelView';
import VistaResultado from './views/ResultView';
import VistaPerfil from './views/ProfileView';
import type { Topic, Progress, ViewName } from './types';

// URLs de tu API en Express (BackEnd)
const API_URL_USUARIOS = 'http://localhost:3000/api/usuarios';
const API_URL_PROGRESO = 'http://localhost:3000/api/progreso';

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
  
  // El progreso inicia vacío hasta que el usuario inicie sesión exitosamente
  const [progress, setProgress] = useState<Progress>({});

// 📡 Sincronizar el progreso desde el BackEnd en tiempo real
 useEffect(() => {
    if (!userName) return;

    console.log("🛰️ Intentando descargar progreso para el usuario:", userName);

    fetch(`${API_URL_PROGRESO}/${userName}`)
      .then((res) => res.json())
      .then((data) => {
        console.log("📦 ¡Esto es lo que me respondió el BackEnd de verdad!:", data);
        setProgress(data);
      })
      .catch((err) => console.error('❌ Error de red fatal:', err));
  }, [userName, view]);
  // REQUISITO 7 y 9: Operación CREATE (POST) al iniciar sesión / registrarse
  const alIniciarSesion = async (name: string, grade: string, email: string, avatar: string) => {
    try {
      const respuesta = await fetch(API_URL_USUARIOS, {
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
        setUserId(datos.usuario.id);
        setUserName(datos.usuario.nombre);
        setUserGrade(datos.usuario.grado);
        setUserEmail(datos.usuario.correo);
        setUserAvatar(datos.usuario.avatar);
        
        // 🎯 Forzamos un fetch inmediato para que el Dashboard no arranque vacío
        const resProgreso = await fetch(`${API_URL_PROGRESO}/${datos.usuario.nombre}`);
        const dataProgreso = await resProgreso.json();
        setProgress(dataProgreso);

        setView('dashboard'); // Mandamos al mapa espacial
      }
    } catch (error) {
      console.error('Error de red al intentar registrar usuario:', error);
    }
  };

  // REQUISITO 7 y 9: Operación UPDATE (PUT) al modificar el perfil
  const alActualizarPerfil = async ({ name, grade, avatar }: { name: string; grade: string; avatar: string }) => {
    if (!userId) return;

    try {
      const respuesta = await fetch(`${API_URL_USUARIOS}/${userId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          nombre: name,
          grado: grade,
          correo: userEmail,
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
      const respuesta = await fetch(`${API_URL_USUARIOS}/${userId}`, {
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

  
  const alCompletarNivel = async (stars: number) => {
    if (!selectedTopic || selectedLevel === null || !userName) return;

    try {
      // 🚀 POST al BackEnd para asegurar las medallas reales en el servidor
      const respuesta = await fetch(`${API_URL_PROGRESO}/guardar`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          alumnoNombre: userName,
          topicId: selectedTopic.id,
          levelIndex: selectedLevel, 
          stars: stars
        })
      });

      if (respuesta.ok) {
        const datos = await respuesta.json();
        
        // 🎯 Sincronización en caliente: Actualizamos la ram de React con la respuesta del BackEnd
        setProgress(prev => ({
          ...prev,
          [selectedTopic.id]: datos.progresoActualizado
        }));
      }
    } catch (error) {
      console.error('Error guardando avance en la base de datos:', error);
    }

    setLastStars(stars);
    setView('result'); // Desplegamos la pantalla del trofeo
  };
  const alSeleccionarTema = (topic: Topic) => {
    setSelectedTopic(topic);
    setView('constellation');
  };

  const alSeleccionarNivel = (levelIdx: number) => {
    setSelectedLevel(levelIdx);
    setView('level');
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
    setProgress({}); // Limpiamos el progreso en pantalla al salir
    setView('login');
  };

  const alReiniciarProgreso = () => {
    setProgress({});
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
          onLogout={alEliminarCuenta}
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