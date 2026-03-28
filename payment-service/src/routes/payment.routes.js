import { Router } from 'express';
import { processPayment, getPaymentStatus } from '../controllers/payment.controller.js';

const router = Router();

router.post('/', processPayment);
router.get('/:orderId', getPaymentStatus); 

export default router;