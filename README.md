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
