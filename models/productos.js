import { DataTypes } from 'sequelize';
import sequelize from '../config/db.js';

const Productos = sequelize.define('Productos', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  nombre: {
    type: DataTypes.STRING,
    allowNull: false
  },
  precio: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false
  }
}, {
  tableName: 'productos',
  timestamps: false
});

export default Productos;
