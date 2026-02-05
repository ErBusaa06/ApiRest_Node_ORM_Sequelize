import { DataTypes } from 'sequelize';
import sequelize from '../config/db.js';

const Logs = sequelize.define('Logs', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    log: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    tableName: 'logs',
    timestamps: true
});

export default Logs;
