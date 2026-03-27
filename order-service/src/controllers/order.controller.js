import Order from '../models/Order.js';
import fetch from 'node-fetch';

export const createOrder = async (req, res) => {
  try {
    const { productId, quantity } = req.body;

    const prodRes = await fetch(`http://localhost:3001/products/${productId}`);
    if (!prodRes.ok) throw new Error('Produto inexistente');

    const invRes = await fetch(`http://localhost:3003/inventory/${productId}`);
    const inventory = await invRes.json();
    if (inventory.quantity < quantity) {
        return res.status(400).json({ error: 'Quantidade superior ao estoque disponível' });
    }

    const order = await Order.create({ status: 'CRIADO' });

    const payRes = await fetch('http://localhost:3004/payments', { method: 'POST' });
    const payment = await payRes.json();

    if (payment.status === 'APROVADO') {
        await order.update({ status: 'PAGO' });
        // Baixa de estoque
        await fetch(`http://localhost:3003/inventory/${productId}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ quantity: -quantity })
        });
    } else {
        await order.update({ status: 'CANCELADO' });
    }

    res.status(201).json(order);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};


export const getOrderById = async (req, res) => {
    try {
        const order = await Order.findByPk(req.params.id);
        if (!order) return res.status(404).json({ error: 'Pedido não encontrado' });
        res.json(order);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};