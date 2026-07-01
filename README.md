# ALTUM - Plataforma de Aprendizaje Matemático

ALTUM es una plataforma educativa interactiva para estudiantes de escuela primaria, diseñada bajo una dinámica de gamificación inspirada en el formato de aprendizaje de Duolingo.

El proyecto tiene como objetivo facilitar el aprendizaje de conceptos matemáticos básicos (sumas, restas, multiplicaciones y divisiones) mediante una interfaz lúdica que muestra el progreso del estudiante en tiempo real.

---

## Estructura del Proyecto

El proyecto está dividido en dos partes: un **Frontend** en React y un **Backend** en Node.js/Express.

```
ALTUM/
├── src/                        # Código fuente del frontend (React + TypeScript)
│   ├── assets/                 # Recursos visuales (imágenes, íconos SVG)
│   ├── components/             # Componentes de UI reutilizables
│   │   ├── EncouragementMessage # Mensajes de ánimo al alumno
│   │   ├── GameHeader          # Encabezado con vidas y progreso
│   │   ├── ProgressBar         # Barra de progreso del nivel
│   │   ├── SpaceBackdrop       # Fondo animado del espacio
│   │   ├── SpacePlanets        # Planetas decorativos
│   │   └── StarDisplay         # Visualización de estrellas ganadas
│   ├── data/
│   │   ├── exercises.ts        # Catálogo local de ejercicios (respaldo)
│   │   └── topics.ts           # Temas y materias disponibles
│   ├── views/                  # Pantallas principales de la aplicación
│   │   ├── LoginView.tsx       # Inicio de sesión y registro
│   │   ├── DashboardView.tsx   # Panel principal del alumno
│   │   ├── ConstellationView   # Mapa de niveles por tema
│   │   ├── LevelView.tsx       # Pantalla de ejercicios activos
│   │   ├── ResultView.tsx      # Resultados y estrellas al completar nivel
│   │   ├── ProfileView.tsx     # Perfil del usuario
│   │   ├── MenuView.jsx        # Menú de navegación
│   │   └── ActivitiesView.jsx  # Vista de actividades disponibles
│   ├── types.ts                # Tipos TypeScript compartidos
│   ├── App.tsx                 # Controlador central de navegación y conexión al backend
│   └── main.tsx                # Punto de entrada de React + Vite
├── Backend/                    # Servidor API en Node.js + Express + TypeScript
│   └── src/
│       ├── controllers/
│       │   ├── UsuarioController.ts   # CRUD de usuarios en memoria
│       │   ├── EjercicioController.ts # Catálogo completo de ejercicios
│       │   └── ProgresoController.ts  # Guardado y consulta del progreso
│       ├── routes/
│       │   ├── usuario.routes.ts      # Rutas GET/POST/PUT/DELETE /api/usuarios
│       │   ├── ejercicio.routes.ts    # Ruta GET /api/ejercicios/:tema/:nivel
│       │   └── progreso.routes.ts     # Rutas GET/POST /api/progreso
│       ├── config/
│       │   └── db.ts                  # Configuración de conexión (sin BD activa)
│       └── index.ts                   # Punto de entrada del servidor Express
├── public/                     # Archivos estáticos (favicon, íconos SVG)
├── proyecto_educativo.sql      # Script SQL de referencia de la base de datos
└── index.html                  # HTML base de la aplicación (Vite)
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

Cada integrante del equipo trabaja en su propia rama personal. **Nunca se ejecutan modificaciones directamente en la rama `main`.**

> [!IMPORTANT]
> Es fundamental descargar los cambios más recientes del repositorio remoto antes de enviar cualquier modificación. Esto previene conflictos de código con las contribuciones de otros miembros del equipo.

### 0. Selección de la rama asignada

Antes de comenzar a programar, cada integrante debe sincronizar su repositorio y moverse a su entorno de trabajo privado.

Sincronice el catálogo de ramas:
```bash
git fetch --all
```

Cambie a su rama correspondiente (reemplace por su nombre):
- **Abril:** `git switch dev/abril`
- **Aldimer:** `git switch dev/aldimer`
- **Mel:** `git switch dev/mel`
- **Susan:** `git switch dev/susan`

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

### 3. Descargar cambios de tu rama remota (Pull)
Descarga y fusiona las modificaciones más recientes de tu propia rama en tu copia local (reemplace por su rama).
```bash
git pull origin dev/abril
git pull origin dev/aldimer
git pull origin dev/mel
git pull origin dev/susan
```

### 4. Subir los cambios a tu rama remota (Push)
Envía las confirmaciones locales al servidor remoto, a **su propia rama** (reemplace por su rama, nunca `main`).
```bash
git push origin dev/abril
git push origin dev/aldimer
git push origin dev/mel
git push origin dev/susan
```

### 5. Integrar los cambios a `main` (Pull Request)
Una vez que su rama esté lista y probada, no se sube directamente a `main`. En su lugar:
1. Vaya al repositorio en GitHub.
2. Abra un **Pull Request** desde su rama (`dev/su-nombre`) hacia `main`.
3. Solicite revisión al equipo antes de fusionar (merge), para evitar romper el código de los demás.
