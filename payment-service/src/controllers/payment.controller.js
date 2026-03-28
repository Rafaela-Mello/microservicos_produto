import Payment from '../models/Payment.js';

// POST /payments (O que você faz no Postman)
export const processPayment = async (req, res) => {
  const { orderId, status } = req.body;
  // O upsert cria se não existir, ou atualiza se já existir o orderId
  await Payment.upsert({ orderId, status }); 
  res.json({ message: "Sucesso!", orderId, status });
};

// GET /payments/:orderId (O que o Order Service chama)
export const getPaymentStatus = async (req, res) => {
  // ATENÇÃO: Use findOne com WHERE, não findByPk!
  const payment = await Payment.findOne({ where: { orderId: req.params.orderId } });
  
  if (!payment) {
    return res.json({ status: 'PENDENTE' });
  }
  
  res.json({ status: payment.status });
};