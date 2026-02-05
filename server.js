import express from 'express';
import cors from 'cors';
import sequelize from './config/db.js';
import productosRoutes from './routes/productosRoutes.js';
import logsRoutes from './routes/logsRoutes.js';

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/productos', productosRoutes);
app.use('/logs', logsRoutes);

// Database connection and server start
const startServer = async () => {
  try {
    await sequelize.authenticate();
    console.log('Base de datos conectada.');

    // Sincronizar modelos con la base de datos
    await sequelize.sync({ alter: true });
    console.log('Modelos sincronizados.');

    app.listen(PORT, () => {
      console.log(`Servidor corriendo en http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error('Error al conectar la base de datos:', error);
  }
};

startServer();
