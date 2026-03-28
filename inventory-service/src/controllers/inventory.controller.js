import Inventory from '../models/Inventory.js';

// GET /inventory/{productId}
export const getInventoryByProduct = async (req, res) => {
  try {
    const [item, created] = await Inventory.findOrCreate({ 
      where: { productId: req.params.productId },
      defaults: { quantity: 0 }
    });

    res.json(item);
  } catch (err) { 
    res.status(500).json({ error: err.message }); 
  }
};

// PUT /inventory/{productId}
export const updateInventory = async (req, res) => {
  try {
    const { productId } = req.params;
    const change = req.body.quantity;

    // tenta encontrar ou criar o registro com quantidade 0
    const [item, created] = await Inventory.findOrCreate({ 
      where: { productId: productId },
      defaults: { quantity: 0 } 
    });

    // Validação de estoque
    if (change < 0 && item.quantity < Math.abs(change)) {
      return res.status(400).json({ error: 'Quantidade superior ao estoque disponível' });
    }

    await item.update({ quantity: item.quantity + change });
    res.json(item);
  } catch (err) { 
    res.status(500).json({ error: err.message }); 
  }
};