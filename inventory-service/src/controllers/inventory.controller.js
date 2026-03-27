import Inventory from '../models/Inventory.js';

// GET /inventory/{productId}
export const getInventoryByProduct = async (req, res) => {
  try {
    const item = await Inventory.findByPk(req.params.productId);
    if (!item) return res.status(404).json({ error: 'Produto não encontrado no estoque' });
    res.json(item);
  } catch (err) { 
    res.status(500).json({ error: err.message }); 
  }
};

// PUT /inventory/{productId}
export const updateInventory = async (req, res) => {
  try {
    const item = await Inventory.findByPk(req.params.productId);
    if (!item) return res.status(404).json({ error: 'Estoque não encontrado' });
    if (req.body.quantity < 0 && item.quantity < Math.abs(req.body.quantity)) {
      return res.status(400).json({ error: 'Quantidade superior ao estoque disponível' });
    }
    await item.update({ quantity: item.quantity + req.body.quantity });
    res.json(item);
  } catch (err) { 
    res.status(500).json({ error: err.message }); 
  }
};