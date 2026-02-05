# ApiRest Node ORM Sequelize

Proyecto Node.js con Express, Sequelize y estructura MVC generada automáticamente.

## Requisitos

- Node.js
- MySQL

## Instalación

1. Instalar dependencias:
   ```bash
   npm install
   ```
2. Configurar base de datos:
   - Crear un archivo `.env` en la raíz (opcional, por defecto usa `root` sin contraseña y DB `api_rest_db`).
   - Ejemplo `.env`:
     ```
     DB_NAME=api_rest_db
     DB_USER=root
     DB_PASSWORD=
     DB_HOST=localhost
     PORT=3000
     ```
3. Asegurarse de que la base de datos `api_rest_db` existe en MySQL.
   ```sql
   CREATE DATABASE IF NOT EXISTS api_rest_db;
   ```

## Ejecución

1. Iniciar servidor:
   ```bash
   npm run dev
   ```
   El servidor iniciará en `http://localhost:3000` y sincronizará las tablas automáticamente.

## AutoCRUD

Para generar automáticamente servicios, controladores y rutas para nuevos modelos:

1. Crear un nuevo modelo en `models/` (ej: `usuarios.js`).
2. Ejecutar el script:
   ```bash
   npm run autocrud
   ```
3. Registrar la nueva ruta en `server.js`:
   ```javascript
   import usuariosRoutes from './routes/usuariosRoutes.js';
   app.use('/api', usuariosRoutes);
   ```

## Endpoints

### Productos
- `GET /api/productos` - Listar todos
- `GET /api/productos/:id` - Obtener por ID
- `POST /api/productos` - Crear (JSON: `{ "nombre": "...", "precio": ... }`)
- `PUT /api/productos/:id` - Actualizar
- `DELETE /api/productos/:id` - Eliminar

### Logs
- `GET /api/logs` - Listar todos
- `GET /api/logs/:id` - Obtener por ID
- `POST /api/logs` - Crear (JSON: `{ "log": "..." }`)
- `PUT /api/logs/:id` - Actualizar
- `DELETE /api/logs/:id` - Eliminar
=======
# API REST Node.js con Sequelize y AutoCRUD

Proyecto de práctica de DWEC: Refactorización a MVC reducida y AutoCRUD con Sequelize (Node.js).

---

## 📝 Descripción

Este proyecto implementa un **API REST** usando **Node.js**, **Express** y **Sequelize** con una arquitectura **MVC reducida**.  
Cuenta con:

- Modelos (`models/`) usando Sequelize.
- Servicios (`services/`) para lógica de acceso a datos.
- Controladores base (`controllers/base/`) generados automáticamente por **AutoCRUD**.
- Controladores extendidos (`controllers/`) para personalización.
- Rutas (`routes/`) mapeando endpoints a controladores.
- Tabla adicional para registrar **logs** (`logs`).

Se incluyen los endpoints CRUD típicos:

- `GET /productos`
- `GET /productos/:id`
- `POST /productos`
- `PUT /productos/:id`
- `DELETE /productos/:id`

- `GET /logs`
- `GET /logs/:id`
- `POST /logs`
- `PUT /logs/:id`
- `DELETE /logs/:id`

---

## ⚙️ Requisitos

- Node.js >= 18
- MySQL
- npm

Dependencias principales:

- express
- sequelize
- mysql2
- dotenv
- cors

---

## 🔧 Instalación

1. Clonar el repositorio:

````
git clone https://github.com/TU_USUARIO/TU_REPO.git
cd TU_REPO
````

2. Instalar dependencias:
````
npm install
````

3. Crear la base de datos en MySQL (ejemplo):
````
CREATE DATABASE api_rest_db;
````

4. Configurar variables de entorno en un archivo .env en la raíz del proyecto:
````
DB_NAME=api_rest_db
DB_USER=root
DB_PASSWORD=TU_PASSWORD
DB_HOST=localhost
PORT=3000
````
🚀 Ejecución del servidor
Para iniciar el servidor en modo desarrollo (con reinicio automático):
````
npm run dev
````
Para iniciar en modo normal:
````
npm start
````
El servidor estará corriendo en: **http://localhost:3000**

---

## 🗂 Estructura del proyecto

controllers/
├── base/ # Controladores base generados por AutoCRUD
│ ├── productosBaseController.js
│ └── logsBaseController.js
├── productosController.js # Controlador extendido
└── logsController.js # Controlador extendido

models/
├── productos.js
└── logs.js

routes/
├── productosRoutes.js
└── logsRoutes.js

services/
├── productosService.js
└── logsService.js

config/
└── db.js # Configuración de Sequelize / MySQL

server.js # Servidor principal
autocrud.js # Script AutoCRUD
.env # Variables de entorno
package.json
README.md


---

## 🛠 Uso de AutoCRUD

El script `autocrud.js` genera automáticamente:

- **Controladores base** (`controllers/base/`)
- **Controladores extendidos** (si no existen, los puedes crear manualmente)
- **Rutas** (`routes/`)
- CRUD básico para cada modelo detectado en `models/`

Ejecutar:

````
node autocrud.js
````
> ⚠️ **Importante:** Al regenerar controladores base, se sobrescriben.  
> Tus controladores extendidos deben vivir en `controllers/`.

---

## 📬 Endpoints de ejemplo

### Productos

**Crear producto**

POST /productos
Content-Type: application/json

{
  "nombre": "Laptop",
  "precio": 1200.50
}

**Obtener todos los productos**

GET /productos
Obtener producto por id

GET /productos/1

**Actualizar producto**

PUT /productos/1
Content-Type: application/json

{
  "nombre": "Laptop Gamer",
  "precio": 1500
}

**Eliminar producto**

DELETE /productos/1
Logs

**Crear log**

POST /logs
Content-Type: application/json

{
  "log": "Usuario creado correctamente"
}

**Obtener todos los logs**

GET /logs

## ✅ Comprobación
Inicia MySQL y asegúrate de que la base de datos existe.

Ejecuta el servidor:
````
npm run dev
````
Prueba los endpoints con Postman o Curl.

Ejecuta node autocrud.js para generar nuevos modelos automáticamente.
