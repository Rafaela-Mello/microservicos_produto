import User from '../models/User.js';

// POST /users
export const createUser = async (req, res) => {
  try {
    const user = await User.create(req.body);
    res.status(201).json(user);
  } catch (err) { 
    res.status(500).json({ error: err.message }); 
  }
};

// GET /users/{id}
export const getUserById = async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id);
    if (!user) return res.status(404).json({ error: 'Usuário não encontrado' });
    res.json(user);
  } catch (err) { 
    res.status(500).json({ error: err.message }); 
  }
};