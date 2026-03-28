import Payment from '../models/Payment.js';

// POST /payments
export const processPayment = async (req, res) => {
  const { orderId, status } = req.body;
  await Payment.upsert({ orderId, status }); // upsert cria se não existir, ou atualiza se já existir o orderId
  res.json({ message: "Sucesso!", orderId, status });
};

// GET /payments/:orderId
export const getPaymentStatus = async (req, res) => {
  const payment = await Payment.findOne({ where: { orderId: req.params.orderId } });
  
  if (!payment) {
    return res.json({ status: 'PENDENTE' });
  }
  
  res.json({ status: payment.status });
};