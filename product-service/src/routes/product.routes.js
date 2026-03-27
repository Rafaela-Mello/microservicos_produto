import { Router } from 'express';
import {
    createProduto,
    getProdutos,
    getProdutoById
} from '../controllers/product.controller.js';

const router = Router();

router.post('/', createProduto);
router.get('/', getProdutos);
router.get('/:id', getProdutoById);

export default router;