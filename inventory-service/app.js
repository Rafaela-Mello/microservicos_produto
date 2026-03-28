import express from 'express';
import dotenv from 'dotenv';
import sequelize from './src/config/database.js';
import inventoryRoutes from './src/routes/inventory.routes.js';

dotenv.config();

const app = express();

app.use(express.json());

app.use('/inventory', inventoryRoutes);

(async () => {
    try {
        await sequelize.sync({ alter: true });
        console.log('Inventory DB sincronizado!');
        app.listen(process.env.PORT, () => {
            console.log(`Inventory Service rodando na porta ${process.env.PORT}`);
        });
    } catch (err) {
        console.error('Erro ao iniciar o Inventory Service:', err);
    }
})();