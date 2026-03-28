import Order from '../models/Order.js';
import fetch from 'node-fetch';

// POST /orders
export const createOrder = async (req, res) => {
  try {
    const { productId, quantity } = req.body;

    // 1. Validar Produto no Catálogo
    const prodRes = await fetch(`http://localhost:3001/products/${productId}`);
    if (!prodRes.ok) throw new Error('Produto inexistente no catálogo');

    // 2. Verificar Estoque
    const invRes = await fetch(`http://localhost:3003/inventory/${productId}`);
    const inventory = await invRes.json();
    if (inventory.quantity < quantity) {
        return res.status(400).json({ error: 'Quantidade insuficiente' });
    }

    // 3. Registrar Pedido com status padrão 'CRIADO'
    const order = await Order.create({ 
      productId: productId,
      quantity: quantity,
      status: 'CRIADO',
    });

    res.status(201).json(order);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// GET /orders/{id}
export const getOrderById = async (req, res) => {
  try {
    const order = await Order.findByPk(req.params.id);
    if (!order) return res.status(404).json({ error: 'Pedido não encontrado' });

    // Se ainda for 'CRIADO', pergunta ao serviço de Pagamento (Porta 3004)
    if (order.status === 'CRIADO') {
      try {
        const payRes = await fetch(`http://localhost:3004/payments/${order.id}`);
        
        if (payRes.ok) {
          const paymentData = await payRes.json();

          if (paymentData.status === 'APROVADO') {
            await order.update({ status: 'PAGO' });
            await order.reload();
        } else if (paymentData.status === 'RECUSADO') {
            await order.update({ status: 'CANCELADO' });
            await order.reload();
          }
        }
      } catch (e) {
        console.log("Serviço de pagamento ainda não tem registro ou está offline.");
      }
    }

    res.json(order);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};