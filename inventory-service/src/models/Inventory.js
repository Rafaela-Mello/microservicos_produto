import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

const Inventory = sequelize.define('Inventory', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    productId: { 
        type: DataTypes.INTEGER, 
        allowNull: false,
        unique: true
    },
    quantity: { 
        type: DataTypes.INTEGER, 
        allowNull: false 
    }
}, {
    timestamps: true
});

export default Inventory;