import { Router } from 'express';
import {
    getInventoryByProduct,
    updateInventory
} from '../controllers/inventory.controller.js';

const router = Router();

router.get('/:productId', getInventoryByProduct); 
router.put('/:productId', updateInventory); 

export default router;