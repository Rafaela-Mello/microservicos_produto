import Order from '../models/Order.js';
import fetch from 'node-fetch';

// POST /orders
export const createOrder = async (req, res) => {
  try {
    const { userId, items } = req.body; // items deve ser um array

    // 1. Validar Usuário (Porta 3002)
    const userRes = await fetch(`http://localhost:3002/users/${userId}`);
    if (!userRes.ok) return res.status(404).json({ error: 'Usuário não encontrado' });

    // 2. Validar cada item no Catálogo e Estoque
    for (const item of items) {
      // Validar Produto (Porta 3001)
      const prodRes = await fetch(`http://localhost:3001/products/${item.productId}`);
      if (!prodRes.ok) return res.status(404).json({ error: `Produto ${item.productId} não existe` });

      // Verificar Estoque (Porta 3003)
      const invRes = await fetch(`http://localhost:3003/inventory/${item.productId}`);
      const inventory = await invRes.json();
      if (inventory.quantity < item.quantity) {
          return res.status(400).json({ error: `Estoque insuficiente para o produto ${item.productId}` });
      }
    }

    // 3. Criar Pedido com a lista de itens
    const order = await Order.create({ 
      userId,
      items,
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

    if (order.status === 'CRIADO') {
      try {
        const payRes = await fetch(`http://localhost:3004/payments/${order.id}`);
        
        if (payRes.ok) {
          const paymentData = await payRes.json();

          if (paymentData.status === 'APROVADO') {
            await order.update({ status: 'PAGO' });

            // Baixa estoque de cada um
            for (const item of order.items) {
              console.log(`Baixando estoque: Produto ${item.productId}, Qtd ${item.quantity}`);
              await fetch(`http://localhost:3003/inventory/${item.productId}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ quantity: -item.quantity })
              });
            }
            
            await order.reload();
          } else if (paymentData.status === 'RECUSADO') {
            await order.update({ status: 'CANCELADO' });
          }
        }
      } catch (e) {
        console.error("Erro na integração:", e.message);
      }
    }

    res.json(order);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};