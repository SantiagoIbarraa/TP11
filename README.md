Claro, aquí tienes un archivo `README.md` completo y bien estructurado para tu proyecto.

-----

# Proyecto Backend - Actividad 11

[cite\_start]Este proyecto es el resultado de la **Actividad 11: INSTALACIÓN, CONFIGURACIÓN Y UTILIZACIÓN DE NODE.JS PARA BACKEND CON JAVASCRIPT** [cite: 3][cite\_start], correspondiente a la materia "Proyecto de Implementación de Sitios web Dinámicos"[cite: 1]. El objetivo es construir un servidor backend con Node.js y Express, implementando varios ejercicios prácticos que abarcan desde rutas básicas hasta autenticación y conexión con bases de datos.

## ✅ Prerrequisitos

Antes de comenzar, asegúrate de tener instalado lo siguiente:

  * [cite\_start]Node.js (se recomienda la versión LTS) [cite: 16]
  * NPM (se instala automáticamente con Node.js)
  * Un servidor de base de datos MySQL.

## ⚙️ Instalación y Configuración

Sigue estos pasos para configurar el proyecto en tu entorno local.

**1. Clonar o descargar el repositorio**
Asegúrate de tener todos los archivos del proyecto en una carpeta local.

**2. Instalar dependencias**
Abre una terminal en la raíz del proyecto y ejecuta el siguiente comando para instalar todas las dependencias listadas en el archivo `package.json`:

```bash
npm install
```

**3. Configurar la Base de Datos**

  * Asegúrate de que tu servidor MySQL esté en funcionamiento.
  * Importa el archivo `proyecto_backend.sql` en tu gestor de base de datos (como phpMyAdmin, DBeaver, etc.). Esto creará la base de datos `proyecto_backend` y las tablas `usuarios` y `productos` con datos de ejemplo.
  * Verifica la configuración de la conexión en el archivo `src/db.js`. Por defecto, está configurado para:
      * **Host**: `localhost`
      * **Usuario**: `root`
      * **Contraseña**: (vacía)
  * Si tu configuración de MySQL es diferente, actualiza estos datos.

## 🚀 Ejecutar la Aplicación

Puedes iniciar el servidor en dos modos:

  * **Modo de Desarrollo**: Utiliza `nodemon` para reiniciar el servidor automáticamente cada vez que se detecta un cambio en los archivos.

    ```bash
    npm run dev
    ```

    [cite\_start][cite: 119, 50]

  * **Modo de Producción**: Inicia el servidor de forma estándar.

    ```bash
    npm start
    ```

    [cite\_start][cite: 118]

[cite\_start]Una vez iniciado, el servidor estará escuchando en `http://localhost:3000`[cite: 90].

## 📂 Estructura del Proyecto

[cite\_start]El proyecto sigue una estructura organizada para separar responsabilidades, como se sugiere en la guía[cite: 51]:

```
proyecto-backend/
├── docs/                 # Carpeta para el ejercicio con sistema de archivos (FS)
├── public/               # Carpeta para archivos estáticos (HTML, CSS)
├── src/
[cite_start]│   ├── controllers/      # Lógica de negocio (controladores) [cite: 65]
│   ├── middleware/       # Middlewares de Express
[cite_start]│   ├── routes/           # Definición de las rutas de la API [cite: 62]
[cite_start]│   ├── app.js            # Archivo principal, configuración del servidor [cite: 60]
│   └── db.js             # Configuración de la conexión a la base de datos
├── package.json          # Metadatos y dependencias del proyecto
└── README.md
```

## 🌐 Documentación de Endpoints

A continuación se detallan todas las rutas disponibles en la aplicación, agrupadas por ejercicio.

-----

### Rutas Básicas y de Contacto (Ejercicio 1, 2, 7)

| Método | Ruta                      | Descripción                                                     |
| :----- | :------------------------ | :-------------------------------------------------------------- |
| `GET`  | `/`                       | [cite\_start]Muestra el mensaje de bienvenida. [cite: 189]                   |
| `GET`  | `/saludo`                 | [cite\_start]Devuelve "Hola mundo". [cite: 194]                              |
| `GET`  | `/saludo?nombre=[nombre]` | [cite\_start]Devuelve un saludo personalizado. [cite: 195]                   |
| `GET`  | `/suma`                   | Muestra un formulario HTML para realizar operaciones.           |
| `POST` | `/suma`                   | [cite\_start]Procesa los datos del formulario y devuelve el resultado. [cite: 196] |
| `GET`  | `/contacto.html`          | [cite\_start]Sirve el formulario de contacto estático. [cite: 240, 241]      |
| `POST` | `/contacto`               | [cite\_start]Recibe y guarda en memoria los datos del formulario. [cite: 241, 242] |
| `GET`  | `/contactos`              | [cite\_start]Muestra la lista de contactos guardados. [cite: 247]            |

### Rutas de Administración (Ejercicio 3)

| Método | Ruta      | Descripción                                                |
| :----- | :-------- | :--------------------------------------------------------- |
| `GET`  | `/admin`  | Ruta protegida. [cite\_start]Requiere un header `Authorization: 123`. [cite: 205] |
| `GET`  | `/usuarios` | Muestra la lista de usuarios desde la base de datos.     |

### API v1 (`/api`)

#### [cite\_start]Sistema de Archivos (Ejercicio 4) [cite: 208]

| Método | Ruta                  | Descripción                                               |
| :----- | :-------------------- | :-------------------------------------------------------- |
| `GET`  | `/api/archivos`       | [cite\_start]Lista los archivos en la carpeta `/docs`. [cite: 211]     |
| `POST` | `/api/archivos`       | [cite\_start]Crea un nuevo archivo con contenido en `/docs`. [cite: 215] |
| `GET`  | `/api/archivos/:nombre` | [cite\_start]Lee y devuelve el contenido de un archivo. [cite: 216]    |

#### [cite\_start]API REST de Tareas (Ejercicio 5) [cite: 218]

| Método   | Ruta             | Descripción                                         |
| :------- | :--------------- | :-------------------------------------------------- |
| `POST`   | `/api/tareas`    | [cite\_start]Crea una nueva tarea. [cite: 220]                   |
| `GET`    | `/api/tareas`    | [cite\_start]Lista todas las tareas. [cite: 221]                 |
| `GET`    | `/api/tareas/:id`  | [cite\_start]Obtiene una tarea por su ID. [cite: 222]            |
| `PUT`    | `/api/tareas/:id`  | [cite\_start]Actualiza una tarea existente. [cite: 223]          |
| `DELETE` | `/api/tareas/:id`  | [cite\_start]Elimina una tarea. [cite: 224]                      |

#### [cite\_start]API de Productos - Base de Datos (Ejercicio 6) [cite: 228]

| Método  | Ruta                 | Descripción                                                |
| :------ | :------------------- | :--------------------------------------------------------- |
| `POST`  | `/api/productos`     | [cite\_start]Crea un nuevo producto en la base de datos. [cite: 232]    |
| `GET`   | `/api/productos`     | [cite\_start]Lista los productos con paginación y búsqueda. [cite: 233, 235] |
| `PATCH` | `/api/productos/:id` | [cite\_start]Actualiza el precio o stock de un producto. [cite: 234]    |

#### [cite\_start]API de Autenticación JWT (Ejercicio 8) [cite: 248]

| Método | Ruta         | Descripción                                                                          |
| :----- | :----------- | :----------------------------------------------------------------------------------- |
| `POST` | `/api/login` | [cite\_start]Recibe `email` y `pass` y, si son válidos, devuelve un token JWT. [cite: 252]          |
| `GET`  | `/api/perfil`  | Ruta protegida. Devuelve los datos del usuario autenticado. [cite\_start]Requiere un token. [cite: 254] |

## 🛠️ Tecnologías Utilizadas

  * **Node.js**: Entorno de ejecución para JavaScript en el servidor.
  * [cite\_start]**Express**: Framework para la creación de servidores y APIs web. [cite: 44]
  * **MySQL2**: Cliente de MySQL para Node.js, para interactuar con la base de datos.
  * [cite\_start]**Body-Parser**: Middleware para procesar el cuerpo de las solicitudes HTTP (`req.body`). [cite: 45]
  * [cite\_start]**CORS**: Middleware para habilitar el Intercambio de Recursos de Origen Cruzado. [cite: 46]
  * [cite\_start]**Nodemon**: Herramienta de desarrollo para reiniciar automáticamente el servidor. [cite: 49]
  * [cite\_start]**JSON Web Token (jsonwebtoken)**: Para implementar autenticación basada en tokens. [cite: 161]
  * [cite\_start]**Bcrypt.js**: Para hashear y comparar contraseñas de forma segura. [cite: 161]
