import Product from '../models/Product.js';
import axios from 'axios';

// POST /products
export const createProduto = async (req, res) => {
  try {
    const produto = await Product.create(req.body);
    res.status(201).json(produto);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// GET /products
export const getProdutos = async (req, res) => {
  try {
    const produtos = await Product.findAll();
    res.json(produtos);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// GET /products/{id}
export const getProdutoById = async (req, res) => {
  try {
    const produto = await Product.findByPk(req.params.id);
    if (!produto) {
      return res.status(404).json({ error: 'Produto não encontrado' });
    }
    res.json(produto);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};