# ALTUM - Plataforma de Aprendizaje Matemático

ALTUM es una plataforma educativa interactiva para estudiantes de escuela primaria, diseñada bajo una dinámica de gamificación inspirada en el formato de aprendizaje de Duolingo.

El proyecto tiene como objetivo facilitar el aprendizaje de conceptos matemáticos básicos (sumas, restas, multiplicaciones y divisiones) mediante una interfaz lúdica que muestra el progreso del estudiante en tiempo real.

---

## Estructura del Proyecto

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
├── App.css            # Estilos dedicados de las vistas y animaciones
├── index.css          # Estilos globales, variables de color (HSL) y tipografía redondeada
├── App.jsx            # Controlador central de la navegación por estados de React
└── main.jsx           # Punto de entrada de React + Vite
```

---

## Cómo Iniciar el Proyecto en Local

Para ejecutar el proyecto en su entorno local, realice los siguientes pasos desde la terminal en la carpeta raíz del proyecto (`ALTUM-Front`):

1. **Instalar dependencias:**
   ```bash
   npm install
   ```

2. **Iniciar el servidor de desarrollo:**
   ```bash
   npm run dev
   ```

3. **Acceder a la aplicación:**
   Abra el navegador en la dirección indicada en la consola (usualmente `http://localhost:5173`).

---

## Flujo de Trabajo en Git

Para guardar y subir las modificaciones locales al repositorio remoto, ejecute los siguientes comandos en orden desde la raíz del proyecto:

> [!IMPORTANT]
> Es fundamental descargar los cambios más recientes del repositorio remoto antes de enviar cualquier modificación. Esto previene conflictos de código con las contribuciones de otros miembros del equipo.

### 1. Preparar los archivos modificados
Selecciona todos los cambios nuevos y modificados en el directorio de trabajo para ser confirmados.
```bash
git add .
```

### 2. Confirmar los cambios localmente (Commit)
Crea un punto de guardado en el historial local con un mensaje descriptivo de las modificaciones.
```bash
git commit -m "Descripción clara de los cambios realizados"
```

### 3. Descargar cambios del repositorio remoto (Pull)
Descarga y fusiona las modificaciones más recientes del servidor en su copia local.
```bash
git pull origin main
```

### 4. Subir los cambios al repositorio remoto (Push)
Envía las confirmaciones locales al servidor remoto para actualizar la rama principal.
```bash
git push origin main
```
