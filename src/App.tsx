// ============================================================
// App.tsx — CEREBRO PRINCIPAL DE LA APP
// Este componente hace DOS cosas fundamentales:
//   1. Controla qué pantalla se muestra (navegación)
//   2. Es el único que decide QUÉ pedir al backend
//
// Ya NO usa fetch() directamente: todas las peticiones pasan por
// services/api.ts (el mismo patrón que ServiceForm → api.ts en
// Taller Mecánico). Si el día de mañana cambia el puerto o la URL
// del backend, solo se toca api.ts — App.tsx no cambia.
// ============================================================

import { useState, useEffect } from 'react';
// useState  → guarda datos que, cuando cambian, actualizan la pantalla automáticamente
// useEffect → ejecuta código cada vez que algo cambia (como "escuchar" un evento)

// Importamos todas las pantallas de la app
import VistaLogin        from './views/LoginView';
import VistaPrincipal    from './views/DashboardView';
import VistaConstelacion from './views/ConstellationView';
import VistaNivel        from './views/LevelView';
import VistaResultado    from './views/ResultView';
import VistaPerfil       from './views/ProfileView';
import VistaTienda       from './views/ShopView';
import AdminView         from './views/AdminView';
import TeacherView       from './views/TeacherView';
import type { Topic, Progress, ViewName, ShopData } from './types';

// Importamos las funciones que hablan con el backend.
// App.tsx ya no sabe (ni le importa) qué URL hay detrás de cada una.
import {
  iniciarSesionORegistrar,
  actualizarPerfil as apiActualizarPerfil,
  eliminarCuenta as apiEliminarCuenta,
  obtenerProgreso,
  borrarProgreso as apiBorrarProgreso,
  guardarProgresoDeNivel,
  obtenerGrupoDeEstudiante,
} from './services/api';

// Guarda la sesión activa en el navegador para que sobreviva a un F5.
// Solo guardamos identidad — el progreso, grupo, etc. se vuelven a pedir
// al backend cada vez (así siempre está fresco, no desactualizado).
const CLAVE_SESION = 'altum_session';

interface SesionGuardada {
  userId: number;
  userName: string;
  userGrade: string;
  userEmail: string;
  userAvatar: string;
  userRole: 'estudiante' | 'tutor' | 'administrador';
}

function guardarSesion(s: SesionGuardada) {
  localStorage.setItem(CLAVE_SESION, JSON.stringify(s));
}
function leerSesion(): SesionGuardada | null {
  try { return JSON.parse(localStorage.getItem(CLAVE_SESION) || 'null'); } catch { return null; }
}
function borrarSesion() {
  localStorage.removeItem(CLAVE_SESION);
}

// Guarda la tienda de cada alumno en el navegador, separado por correo
const CLAVE_TIENDA = 'altum_shop';

function obtenerTiendaDe(email: string): ShopData {
  try {
    const todas = JSON.parse(localStorage.getItem(CLAVE_TIENDA) || '{}');
    return todas[email] ?? { ownedItems: [], equipped: null, spentStars: 0 };
  } catch {
    return { ownedItems: [], equipped: null, spentStars: 0 };
  }
}

function guardarTiendaDe(email: string, data: ShopData): void {
  const todas = JSON.parse(localStorage.getItem(CLAVE_TIENDA) || '{}');
  todas[email] = data;
  localStorage.setItem(CLAVE_TIENDA, JSON.stringify(todas));
}

// Suma todas las estrellas ganadas en todos los temas y niveles del progreso
function calcularEstrellasTotales(progress: Progress): number {
  let total = 0;
  Object.values(progress).forEach(topicProg => {
    Object.values(topicProg).forEach(level => { total += level.stars ?? 0; });
  });
  return total;
}

export default function Aplicacion() {

  // ── ESTADO DE NAVEGACIÓN ─────────────────────────────────────
  // "view" guarda el nombre de la pantalla actual.
  // Empieza en 'login' porque es la primera pantalla que ve el usuario.
  const [view, setView] = useState<ViewName>('login');

  // ── ESTADO DEL USUARIO ───────────────────────────────────────
  // Estos estados guardan los datos del alumno logueado.
  // Empiezan vacíos/null porque nadie ha iniciado sesión aún.
  const [userId,    setUserId]    = useState<number | null>(null);
  const [userName,  setUserName]  = useState('');
  const [userGrade, setUserGrade] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [userAvatar,setUserAvatar]= useState('👨‍🚀');
  const [userRole,  setUserRole]  = useState<'estudiante' | 'tutor' | 'administrador'>('estudiante');

  // ── ESTADO DEL JUEGO ─────────────────────────────────────────
  const [selectedTopic, setSelectedTopic] = useState<Topic | null>(null); // tema seleccionado
  const [selectedLevel, setSelectedLevel] = useState<number | null>(null); // índice del nivel (0-7)
  const [lastStars,     setLastStars]     = useState(0); // estrellas del último nivel jugado

  // ── ESTADO DEL PROGRESO ──────────────────────────────────────
  // Objeto que guarda cuántos niveles completó el alumno y con cuántas estrellas.
  // Empieza vacío {} y se llena desde el backend al iniciar sesión.
  const [progress, setProgress] = useState<Progress>({});

  // ── ESTADO DE LA TIENDA ──────────────────────────────────────
  // Qué accesorios compró el alumno y cuál tiene puesto (se guarda en localStorage)
  const [shopData, setShopData] = useState<ShopData>({ ownedItems: [], equipped: null, spentStars: 0 });

  // ── ESTADO DEL GRUPO DE CLASE ─────────────────────────────────
  // Si el alumno se unió a un grupo con un código, aquí vive ese grupo
  // (con los temas y ejercicios que su maestro dejó habilitados).
  // null = no pertenece a ningún grupo → ve el catálogo completo, sin restricciones.
  const [misGrupo, setMisGrupo] = useState<any | null>(null);

  // ── RESTAURAR SESIÓN AL RECARGAR LA PÁGINA (F5) ───────────────
  // Se ejecuta UNA sola vez al montar la app. Si hay una sesión guardada
  // en localStorage, la restauramos en vez de mandar a login.
  //
  // sesionCargando evita el "parpadeo" de ver la pantalla de login
  // por una fracción de segundo antes de saltar a la pantalla real.
  const [sesionCargando, setSesionCargando] = useState(true);

  useEffect(() => {
    const sesion = leerSesion();
    if (!sesion) {
      setSesionCargando(false); // no hay sesión guardada → login normal
      return;
    }

    setUserId(sesion.userId);
    setUserName(sesion.userName);
    setUserGrade(sesion.userGrade);
    setUserEmail(sesion.userEmail);
    setUserAvatar(sesion.userAvatar);
    setUserRole(sesion.userRole);

    if (sesion.userRole === 'estudiante') {
      setShopData(obtenerTiendaDe(sesion.userEmail));
      obtenerGrupoDeEstudiante(sesion.userId)
        .then(dataGrupo => setMisGrupo(dataGrupo.data || null))
        .catch(() => setMisGrupo(null));
      setView('dashboard');
    } else if (sesion.userRole === 'tutor') {
      setView('teacher');
    } else if (sesion.userRole === 'administrador') {
      setView('admin');
    }

    setSesionCargando(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // [] = solo al montar, una vez

  // ── SINCRONIZACIÓN AUTOMÁTICA DEL PROGRESO ───────────────────
  // useEffect se ejecuta automáticamente cada vez que cambia userName o view.
  // Así el progreso siempre está actualizado al volver al dashboard.
  useEffect(() => {
    if (!userName) return; // si no hay usuario logueado, no hace nada

    console.log("🛰️ Intentando descargar progreso para el usuario:", userName);

    obtenerProgreso(userName)
      .then((data) => {
        console.log("📦 ¡Esto es lo que me respondió el BackEnd de verdad!:", data);
        setProgress(data);               // guarda el progreso en el estado → actualiza la pantalla
      })
      .catch((err) => console.error('❌ Error de red fatal:', err));
  }, [userName, view]); // se ejecuta cuando cambia el nombre del usuario O la pantalla actual

  // ── INICIAR SESIÓN / REGISTRARSE ─────────────────────────────
  // REQUISITO 7 y 9: Operación CREATE (POST) al iniciar sesión / registrarse
  // El backend distingue automáticamente si es login o registro según si el nombre ya existe.
  const alIniciarSesion = async (name: string, grade: string, email: string, avatar: string, role: 'estudiante' | 'tutor' | 'administrador' = 'estudiante') => {
    try {
      // iniciarSesionORegistrar hace el POST por dentro; aquí ya solo recibimos el resultado
      const datos = await iniciarSesionORegistrar({
        nombre: name,
        grado: grade,
        correo: email,
        role: role,
      });

      if (datos.usuario) {
        // Guardamos los datos del usuario en los estados de React
        setUserId(datos.usuario.id_usuario ?? datos.usuario.id);
        setUserName(datos.usuario.nombre);
        setUserGrade(datos.usuario.grado ?? grade);
        setUserEmail(datos.usuario.correo);
        setUserAvatar(datos.usuario.avatar || avatar || '👨‍🚀');
        setUserRole(role);

        // Descargamos el progreso inmediatamente para que el Dashboard no aparezca vacío
        if (role === 'estudiante') {
          const dataProgreso = await obtenerProgreso(datos.usuario.nombre);
          setProgress(dataProgreso);

          // Cargamos los accesorios que este alumno ya había comprado antes
          setShopData(obtenerTiendaDe(datos.usuario.correo));

          // Averiguamos si el alumno pertenece a un grupo de clase (se unió con un código)
          // Si pertenece, el Dashboard solo mostrará los temas/ejercicios que su maestro asignó
          try {
            const idUsuario = datos.usuario.id_usuario ?? datos.usuario.id;
            const dataGrupo = await obtenerGrupoDeEstudiante(idUsuario);
            setMisGrupo(dataGrupo.data || null);
          } catch {
            setMisGrupo(null);
          }
        }

        // Redirigir según el rol
        if (role === 'administrador') {
          setView('admin');
        } else if (role === 'tutor') {
          setView('teacher');
        } else {
          setView('dashboard');
        }

        // Guardamos la sesión para que sobreviva a un F5 / recargar la página
        guardarSesion({
          userId: datos.usuario.id_usuario ?? datos.usuario.id,
          userName: datos.usuario.nombre,
          userGrade: datos.usuario.grado ?? grade,
          userEmail: datos.usuario.correo,
          userAvatar: datos.usuario.avatar || avatar || '👨‍🚀',
          userRole: role,
        });
      }
    } catch (error) {
      console.error('Error de red al intentar registrar usuario:', error);
    }
  };

  // ── ACTUALIZAR PERFIL ────────────────────────────────────────
  // REQUISITO 7 y 9: Operación UPDATE (PUT) al modificar el perfil
  const alActualizarPerfil = async ({ name, grade, avatar }: { name: string; grade: string; avatar: string }) => {
    if (!userId) return; // si no hay usuario logueado, no hace nada

    try {
      // apiActualizarPerfil hace el PUT con el ID en la URL por dentro
      const datos = await apiActualizarPerfil(userId, {
        nombre: name,
        grado: grade,
        correo: userEmail,
        avatar,
      });

      if (datos.usuario) {
        // Actualizamos los estados locales para reflejar los cambios en pantalla al instante
        setUserName(datos.usuario.nombre);
        setUserGrade(datos.usuario.grado);
        setUserAvatar(datos.usuario.avatar);

        // Y la sesión guardada, para que un F5 después de editar no te muestre lo viejo
        guardarSesion({
          userId,
          userName: datos.usuario.nombre,
          userGrade: datos.usuario.grado,
          userEmail,
          userAvatar: datos.usuario.avatar,
          userRole,
        });
      } else {
        console.error('Error al actualizar en BackEnd:', datos.error);
      }
    } catch (error) {
      console.error('Error de red al actualizar perfil:', error);
    }
  };

  // ── ELIMINAR CUENTA ──────────────────────────────────────────
  // REQUISITO 7 y 9: Operación DELETE (DELETE) al reiniciar o eliminar cuenta
  const alEliminarCuenta = async () => {
    if (!userId) return;

    try {
      const datos = await apiEliminarCuenta(userId);

      if (datos.mensaje) {
        alCerrarSesion(); // si se borró en el backend, cerramos sesión en el frontend también
      } else {
        console.error('Error al eliminar en el BackEnd');
      }
    } catch (error) {
      console.error('Error de red al eliminar cuenta:', error);
    }
  };

  // ── COMPLETAR NIVEL ──────────────────────────────────────────
  // Se llama cuando el alumno termina todas las preguntas de un nivel.
  // Recibe cuántas estrellas ganó (1, 2 o 3) y las guarda en el backend.
  const alCompletarNivel = async (stars: number) => {
    if (!selectedTopic || selectedLevel === null || !userName) return;

    try {
      const datos = await guardarProgresoDeNivel({
        alumnoNombre: userName,
        topicId:      selectedTopic.id,
        levelIndex:   selectedLevel,
        stars:        stars,
      });

      if (datos.success) {
        // Actualizamos el progreso local con la respuesta del backend
        // ...prev copia todo el progreso anterior (spread operator)
        // [selectedTopic.id] reemplaza solo el tema que acaba de jugar
        setProgress(prev => ({
          ...prev,
          [selectedTopic.id]: datos.progresoActualizado
        }));
      }
    } catch (error) {
      console.error('Error guardando avance en la base de datos:', error);
    }

    setLastStars(stars);
    setView('result'); // mostramos la pantalla de trofeo con las estrellas ganadas
  };

  // ── FUNCIONES DE NAVEGACIÓN ──────────────────────────────────
  // Estas funciones cambian la pantalla y guardan qué tema/nivel eligió el alumno

  const alSeleccionarTema = (topic: Topic) => {
    setSelectedTopic(topic);     // guarda el tema elegido para pasárselo a la constelación
    setView('constellation');    // va al mapa de niveles
  };

  const alSeleccionarNivel = (levelIdx: number) => {
    setSelectedLevel(levelIdx);  // guarda el índice del nivel (0-7)
    setView('level');            // va a la pantalla de preguntas
  };

  const alSiguienteNivel = () => {
    // prev es el valor actual del estado → le suma 1 para ir al siguiente nivel
    setSelectedLevel(prev => (prev !== null ? prev + 1 : 0));
    setView('level');
  };

  const alCerrarSesion = () => {
    borrarSesion(); // limpia la sesión guardada para que el próximo F5 sí mande a login
    // Limpiamos TODOS los estados — como si la app volviera a arrancar
    setUserId(null);
    setUserName('');
    setUserGrade('');
    setUserEmail('');
    setUserAvatar('👨‍🚀');
    setSelectedTopic(null);
    setSelectedLevel(null);
    setProgress({}); // limpiamos el progreso para que no se vea en pantalla al salir
    setShopData({ ownedItems: [], equipped: null, spentStars: 0 }); // limpiamos la tienda en pantalla
    setMisGrupo(null); // limpiamos el grupo de clase
    setView('login');
  };

  const alReiniciarProgreso = async () => {
    setProgress({}); // borra visualmente de inmediato, para que se sienta instantáneo
    if (!userId) return;
    try {
      await apiBorrarProgreso(userId); // y ahora también borra las filas reales en MySQL
    } catch (error) {
      console.error('Error al borrar el progreso en la base de datos:', error);
    }
  };

  // ── COMPRAR UN ACCESORIO DE LA TIENDA ────────────────────────
  const alComprarAccesorio = (itemId: string, price: number) => {
    setShopData(prev => {
      const actualizado: ShopData = {
        ...prev,
        ownedItems: [...prev.ownedItems, itemId],
        spentStars: prev.spentStars + price,
      };
      guardarTiendaDe(userEmail, actualizado); // persiste en localStorage
      return actualizado;
    });
  };

  // ── PONERSE / QUITARSE UN ACCESORIO ──────────────────────────
  const alEquiparAccesorio = (itemId: string | null) => {
    setShopData(prev => {
      const actualizado: ShopData = { ...prev, equipped: itemId };
      guardarTiendaDe(userEmail, actualizado);
      return actualizado;
    });
  };

  // ── RESTRICCIONES POR GRUPO DE CLASE ─────────────────────────
  // Si el alumno pertenece a un grupo, solo puede ver los temas que su
  // maestro asignó. Si no pertenece a ninguno (misGrupo === null), ve todo.
  const temasPermitidos: string[] | null = misGrupo
    ? misGrupo.temas.map((t: any) => t.id_tema)
    : null;

  // Dentro de un tema, si el maestro curó niveles específicos (pestaña
  // "Ejercicios") solo se muestran esos. Si NO curó ninguno para ese tema
  // en particular, se muestran los 8 completos (mejor default: no vacío).
  const ejerciciosDelTemaActual = (misGrupo?.ejercicios || [])
    .filter((e: any) => typeof e.id_ejercicio === 'string' && e.id_ejercicio.startsWith(`${selectedTopic?.id}-`));

  const nivelesPermitidos: number[] | null = (misGrupo && selectedTopic && ejerciciosDelTemaActual.length > 0)
    ? ejerciciosDelTemaActual.map((e: any) => Number(e.id_ejercicio.split('-').pop()))
    : null;

  // Mientras se revisa si hay una sesión guardada, mostramos esto en vez
  // del login — pantalla en blanco simple, como un recargo normal.
  if (sesionCargando) {
    return <div style={{ minHeight: '100vh', background: '#2e1065' }} />;
  }

  // ── RENDERIZADO ──────────────────────────────────────────────
  // El return decide QUÉ pantalla mostrar según el estado "view".
  // Solo se muestra UNA pantalla a la vez.
  // El && es renderizado condicional: "si esto es true, muestra este componente"
  return (
    <>
      {/* Pantalla de login/registro — primera que ve el usuario */}
      {view === 'login' && (
        <VistaLogin onLogin={alIniciarSesion} />
      )}

      {/* Mapa espacial con los 6 temas */}
      {view === 'dashboard' && (
        <VistaPrincipal
          userName={userName}
          userGrade={userGrade}
          userAvatar={userAvatar}
          progress={progress}
          temasPermitidos={temasPermitidos}
          ejerciciosDelGrupo={misGrupo?.ejercicios || []}
          onSelectTopic={alSeleccionarTema}
          onProfile={() => setView('profile')}
          onLogout={alCerrarSesion}
        />
      )}

      {/* Perfil del alumno — editar nombre, grado, avatar, ver tienda */}
      {view === 'profile' && (
        <VistaPerfil
          userId={userId ?? 0}
          userName={userName}
          userGrade={userGrade}
          userEmail={userEmail}
          userAvatar={userAvatar}
          progress={progress}
          shopData={shopData}
          nombreGrupo={misGrupo?.nombre_grupo || null}
          onBack={() => setView('dashboard')}
          onUpdate={alActualizarPerfil}
          onLogout={alCerrarSesion}
          onDeleteAccount={alEliminarCuenta}
          onResetProgress={alReiniciarProgreso}
          onGoShop={() => setView('shop')}
        />
      )}

      {/* Tienda — comprar y ponerse accesorios con las estrellas ganadas */}
      {view === 'shop' && (
        <VistaTienda
          avatar={userAvatar}
          totalStars={calcularEstrellasTotales(progress)}
          shopData={shopData}
          onBuy={alComprarAccesorio}
          onEquip={alEquiparAccesorio}
          onBack={() => setView('profile')}
        />
      )}

      {/* Mapa de constelación — 8 niveles del tema elegido */}
      {/* La doble condición (&&) evita que truene si no hay tema seleccionado */}
      {view === 'constellation' && selectedTopic && (
        <VistaConstelacion
          topic={selectedTopic}
          progress={progress}
          userGrade={userGrade}
          nivelesPermitidos={nivelesPermitidos}
          onSelectLevel={alSeleccionarNivel}
          onBack={() => setView('dashboard')}
        />
      )}

      {/* Pantalla de preguntas — el juego activo */}
      {view === 'level' && selectedTopic && selectedLevel !== null && (
        <VistaNivel
          topic={selectedTopic}
          levelIdx={selectedLevel}
          userGrade={userGrade}
          onComplete={alCompletarNivel}
          onBack={() => setView('constellation')}
        />
      )}

      {/* Pantalla de resultados — trofeo y estrellas al terminar */}
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

      {/* Panel del Administrador — CRUD de ejercicios */}
      {view === 'admin' && (
        <AdminView onBack={alCerrarSesion} />
      )}

      {/* Panel del Maestro — Gestión de grupos */}
      {view === 'teacher' && (
        <TeacherView userId={userId ?? 0} userEmail={userEmail} onBack={alCerrarSesion} />
      )}
    </>
  );
}
