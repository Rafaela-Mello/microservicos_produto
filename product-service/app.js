import express from 'express';
import dotenv from 'dotenv';
import sequelize from './src/config/database.js';
import productRoutes from './src/routes/product.routes.js';

dotenv.config();

const app = express();

app.use(express.json());

app.use('/products', productRoutes);

(async () => {
    try {
        await sequelize.sync({ alter: true });
        console.log('Produto DB sincronizado!');
        app.listen(process.env.PORT, () => {
            console.log(`Produto Service rodando na porta ${process.env.PORT}`);
        });
    } catch (err) {
        console.error('Erro ao iniciar o Produto Service:', err);
    }
})();