// ============================================================
// App.tsx — CEREBRO PRINCIPAL DE LA APP
// Este componente hace DOS cosas fundamentales:
//   1. Controla qué pantalla se muestra (navegación)
//   2. Es el único que habla directamente con el backend
//
// Las vistas (Login, Dashboard, etc.) solo muestran datos.
// Cuando el usuario hace algo (clic, respuesta, etc.), le avisan
// al App.tsx y ÉL decide qué hacer y qué pantalla mostrar.
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

// URLs base del backend — si cambia el puerto, solo se cambia aquí
const API_URL_USUARIOS = 'http://localhost:3000/api/usuarios';
const API_URL_PROGRESO = 'http://localhost:3000/api/progreso';

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
  const [userRole,  setUserRole]  = useState<'student' | 'teacher' | 'admin'>('student');

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

  // ── SINCRONIZACIÓN AUTOMÁTICA DEL PROGRESO ───────────────────
  // useEffect se ejecuta automáticamente cada vez que cambia userName o view.
  // Así el progreso siempre está actualizado al volver al dashboard.
  useEffect(() => {
    if (!userName) return; // si no hay usuario logueado, no hace nada

    console.log("🛰️ Intentando descargar progreso para el usuario:", userName);

    // fetch hace una petición GET al backend para traer el progreso del alumno
    fetch(`${API_URL_PROGRESO}/${userName}`)
      .then((res) => res.json())         // convierte la respuesta de texto a objeto JavaScript
      .then((data) => {
        console.log("📦 ¡Esto es lo que me respondió el BackEnd de verdad!:", data);
        setProgress(data);               // guarda el progreso en el estado → actualiza la pantalla
      })
      .catch((err) => console.error('❌ Error de red fatal:', err));
  }, [userName, view]); // se ejecuta cuando cambia el nombre del usuario O la pantalla actual

  // ── INICIAR SESIÓN / REGISTRARSE ─────────────────────────────
  // REQUISITO 7 y 9: Operación CREATE (POST) al iniciar sesión / registrarse
  // El backend distingue automáticamente si es login o registro según si el nombre ya existe.
  const alIniciarSesion = async (name: string, grade: string, email: string, avatar: string, role: 'student' | 'teacher' | 'admin' = 'student') => {
    try {
      // await pausa esta función hasta que el backend responda
      const respuesta = await fetch(API_URL_USUARIOS, {
        method: 'POST',                                  // POST = crear/enviar datos
        headers: { 'Content-Type': 'application/json' }, // avisa que mandamos JSON
        body: JSON.stringify({                            // convierte el objeto a texto JSON
          nombre: name,
          grado: grade,
          correo: email,
          avatar: avatar || '👨‍🚀',
          role: role
        }),
      });

      const datos = await respuesta.json(); // convierte la respuesta a objeto JavaScript

      if (respuesta.ok) { // .ok es true si el código HTTP fue 200 o 201
        // Guardamos los datos del usuario en los estados de React
        setUserId(datos.usuario.id);
        setUserName(datos.usuario.nombre);
        setUserGrade(datos.usuario.grado);
        setUserEmail(datos.usuario.correo);
        setUserAvatar(datos.usuario.avatar);
        setUserRole(role);

        // Descargamos el progreso inmediatamente para que el Dashboard no aparezca vacío
        if (role === 'student') {
          const resProgreso  = await fetch(`${API_URL_PROGRESO}/${datos.usuario.nombre}`);
          const dataProgreso = await resProgreso.json();
          setProgress(dataProgreso);

          // Cargamos los accesorios que este alumno ya había comprado antes
          setShopData(obtenerTiendaDe(datos.usuario.correo));
        }

        // Redirigir según el rol
        if (role === 'admin') {
          setView('admin');
        } else if (role === 'teacher') {
          setView('teacher');
        } else {
          setView('dashboard');
        }
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
      // PUT con el ID en la URL → el backend busca ese usuario y lo reemplaza
      const respuesta = await fetch(`${API_URL_USUARIOS}/${userId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nombre: name, grado: grade, correo: userEmail, avatar }),
      });

      const datos = await respuesta.json();

      if (respuesta.ok) {
        // Actualizamos los estados locales para reflejar los cambios en pantalla al instante
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

  // ── ELIMINAR CUENTA ──────────────────────────────────────────
  // REQUISITO 7 y 9: Operación DELETE (DELETE) al reiniciar o eliminar cuenta
  const alEliminarCuenta = async () => {
    if (!userId) return;

    try {
      // DELETE con el ID en la URL → el backend elimina ese usuario del array
      const respuesta = await fetch(`${API_URL_USUARIOS}/${userId}`, {
        method: 'DELETE',
        // No necesita body porque solo usamos el ID de la URL
      });

      if (respuesta.ok) {
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
      const respuesta = await fetch(`${API_URL_PROGRESO}/guardar`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          alumnoNombre: userName,
          topicId:      selectedTopic.id,
          levelIndex:   selectedLevel,
          stars:        stars
        })
      });

      if (respuesta.ok) {
        const datos = await respuesta.json();

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
    setView('login');
  };

  const alReiniciarProgreso = () => {
    setProgress({}); // borra el progreso visualmente (el backend no se toca)
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
          onSelectTopic={alSeleccionarTema}
          onProfile={() => setView('profile')}
          onLogout={alCerrarSesion}
        />
      )}

      {/* Perfil del alumno — editar nombre, grado, avatar, ver tienda */}
      {view === 'profile' && (
        <VistaPerfil
          userName={userName}
          userGrade={userGrade}
          userEmail={userEmail}
          userAvatar={userAvatar}
          progress={progress}
          shopData={shopData}
          onBack={() => setView('dashboard')}
          onUpdate={alActualizarPerfil}
          onLogout={alEliminarCuenta}
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
        <TeacherView userEmail={userEmail} onBack={alCerrarSesion} />
      )}
    </>
  );
}
