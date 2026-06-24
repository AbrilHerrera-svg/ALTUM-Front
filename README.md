# ALTUM - Aventura Matemática 🧠✨

**ALTUM** es una plataforma educativa interactiva y divertida para niños de escuela primaria, diseñada bajo una dinámica visual lúdica y amigable inspirada en el formato de aprendizaje de **Duolingo**.

El objetivo de ALTUM es que los niños dominen las matemáticas básicas (como sumas, restas, multiplicaciones y divisiones) a través del juego, ganando puntos, superando retos y viendo su progreso en tiempo real con personajes y elementos visuales interactivos.

---

## 📁 Estructura del Proyecto

El código fuente del frontend está organizado de la siguiente manera directamente en la raíz del repositorio:

```
src/
├── assets/            # Recursos visuales (ilustraciones, avatares, iconos)
├── components/        # Componentes de UI reutilizables
│   ├── common/        # Botones 3D interactivos, tarjetas de juego y cajas de texto
│   └── game/          # Elementos específicos de las dinámicas (vidas, premios)
├── views/             # Vistas principales de la aplicación (Pantallas)
│   ├── LoginView.jsx      # Pantalla de bienvenida y registro de nombre
│   ├── MenuView.jsx       # Tablero de selección de niveles (Fácil y Difícil)
│   └── ActivitiesView.jsx # Interfaz del juego con preguntas, pistas y barra de progreso
├── App.css            # Estilos dedicados de las vistas y animaciones lúdicas
├── index.css          # Estilos globales, variables de color (HSL) y tipografía redondeada
├── App.jsx            # Controlador central de la navegación por estados de React
└── main.jsx           # Punto de entrada de React + Vite
```

---

## 🚀 Cómo Iniciar el Proyecto en Local

Para ver el proyecto funcionando en tu computadora, sigue estos sencillos pasos en tu terminal (asegúrate de estar situado en la carpeta raíz del proyecto `ALTUM-Front`):

1. **Instala las dependencias (solo la primera vez):**
   ```bash
   npm install
   ```

2. **Inicia el servidor de desarrollo:**
   ```bash
   npm run dev
   ```

3. **Abre tu navegador** en la dirección que te muestre la consola (normalmente `http://localhost:5173`).

---

## 📤 Pasos para Subir tus Cambios a Git (Hacer Push)

Cuando hayas hecho cambios en el código y quieras guardarlos y subirlos al repositorio remoto (GitHub, GitLab, etc.), realiza estos comandos en orden desde la raíz del repositorio:

> [!IMPORTANT]
> **REGLA DE ORO:** Siempre debes asegurarte de descargar los cambios más recientes que otros miembros del equipo hayan subido antes de enviar los tuyos. Esto evita conflictos en el código. ¡Siempre haz un `git pull` antes de tu `git push`!

### 1. Preparar todos los archivos modificados
Este comando selecciona todos los cambios nuevos y modificados en tu carpeta de trabajo para ser guardados.
```bash
git add .
```

### 2. Guardar los cambios con un mensaje explicativo
Crea un punto de guardado (commit) en tu historial local con una breve descripción de lo que hiciste.
```bash
git commit -m "Mi primer commit: estructura del proyecto y vistas iniciales de ALTUM"
```

### 3. Descargar cambios recientes del servidor (PULL)
Este paso es **obligatorio** antes de subir tus cosas. Descarga y fusiona los cambios más recientes del repositorio remoto en tu código local.
```bash
git pull
```

### 4. Subir tus cambios a internet (PUSH)
Envía tus commits locales guardados al servidor en la nube para actualizar el repositorio remoto de forma segura.
```bash
git push
```

¡Y listo! Tus cambios estarán actualizados y seguros en el repositorio. 🚀
