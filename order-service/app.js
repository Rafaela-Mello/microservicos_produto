import express from 'express';
import dotenv from 'dotenv';
import sequelize from './src/config/database.js';
import orderRoutes from './src/routes/order.routes.js';

dotenv.config();

const app = express();

app.use(express.json());

app.use('/orders', orderRoutes);

(async () => {
    try {
        await sequelize.sync({ alter: true });
        console.log('Order DB sincronizado!');
        app.listen(process.env.PORT, () => {
            console.log(`Order Service rodando na porta ${process.env.PORT}`);
        });
    } catch (err) {
        console.error('Erro ao iniciar o Order Service:', err);
    }
})();