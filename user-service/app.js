import express from 'express';
import dotenv from 'dotenv';
import sequelize from './src/config/database.js';
import userRoutes from './src/routes/user.routes.js';

dotenv.config();

const app = express();
app.use(express.json());

app.use('/users', userRoutes);

(async () => {
    try {
        await sequelize.sync({ alter: true });
        console.log('User DB sincronizado!');
        app.listen(process.env.PORT, () => {
            console.log(`User Service rodando na porta ${process.env.PORT}`);
        });
    } catch (err) {
        console.error('Erro ao iniciar o User Service:', err);
    }
})();