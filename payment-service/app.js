import express from 'express';
import dotenv from 'dotenv';
import sequelize from './src/config/database.js';
import paymentRoutes from './src/routes/payment.routes.js';

dotenv.config();

const app = express();

app.use(express.json());

app.use('/payments', paymentRoutes);

(async () => {
    try {
        await sequelize.sync({ alter: true });
        console.log('Payment DB sincronizado!');
        app.listen(process.env.PORT, () => {
            console.log(`Payment Service rodando na porta ${process.env.PORT}`);
        });
    } catch (err) {
        console.error('Erro ao iniciar o Payment Service:', err);
    }
})();