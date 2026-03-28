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

    if (order.status === 'CRIADO') {
      console.log(`Chamando Payment Service para o pedido ${order.id}...`);
      try {
        const payRes = await fetch(`http://localhost:3004/payments/${order.id}`);
        
        if (payRes.ok) {
          const paymentData = await payRes.json();
          console.log(`Resposta do Payment:`, paymentData);

          if (paymentData.status === 'APROVADO') {
            // 1. Atualiza o status do pedido para PAGO
            await order.update({ status: 'PAGO' });
            console.log(`Status atualizado para PAGO no banco.`);

            // 2. LOGICA NOVA: Baixa no Estoque (Porta 3003)
            console.log(`Solicitando baixa de estoque para o produto ${order.productId}...`);
            const stockRes = await fetch(`http://localhost:3003/inventory/${order.productId}`, {
              method: 'PUT',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ quantity: -order.quantity }) // Enviamos valor negativo para subtrair
            });

            if (stockRes.ok) {
              console.log(`Estoque atualizado com sucesso para o pedido ${order.id}.`);
            } else {
              const stockError = await stockRes.json();
              console.error(`Falha ao atualizar estoque: ${stockError.error}`);
            }

          } else if (paymentData.status === 'RECUSADO') {
            await order.update({ status: 'CANCELADO' });
            console.log(`Status atualizado para CANCELADO no banco.`);
          }
        }
      } catch (e) {
        console.error("Erro na comunicação com os serviços:", e.message);
      }
    }

    res.json(order);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};