import React, { useState } from 'react';
import LoginView from './views/LoginView';
import MenuView from './views/MenuView';
import ActivitiesView from './views/ActivitiesView';
import './App.css';

function App() {
  // Estados para controlar la navegación y la sesión sencilla del niño
  // AVANCE: Para proyectos más grandes, se recomienda usar React Router y Context API o Zustand para el estado global
  const [view, setView] = useState('login'); // 'login', 'menu', 'activities'
  const [userName, setUserName] = useState('');
  const [userGrade, setUserGrade] = useState('');
  const [selectedLevel, setSelectedLevel] = useState(null);

  const handleLogin = (name, grade) => {
    setUserName(name);
    setUserGrade(grade || '');
    setView('menu');
  };

  const handleSelectLevel = (level) => {
    setSelectedLevel(level);
    setView('activities');
  };

  const handleBackToMenu = () => {
    setView('menu');
  };

  const handleBackToLogin = () => {
    setView('login');
  };

  return (
    <>
      {view === 'login' && (
        <LoginView onLogin={handleLogin} />
      )}

      {view === 'menu' && (
        <MenuView
          userName={userName}
          userGrade={userGrade}
          onSelectLevel={handleSelectLevel}
          onBack={handleBackToLogin}
        />
      )}

      {view === 'activities' && (
        <ActivitiesView 
          level={selectedLevel} 
          onBack={handleBackToMenu} 
        />
      )}
    </>
  );
}

export default App;