import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

const Order = sequelize.define('Order', {
    id: { 
        type: DataTypes.INTEGER, 
        primaryKey: true,
        autoIncrement: true 
    },
    status: { 
        type: DataTypes.STRING, 
        defaultValue: 'CRIADO' 
    }
}, { 
    timestamps: true 
});

export default Order;