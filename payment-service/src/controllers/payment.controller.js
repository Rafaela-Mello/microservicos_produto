export const processPayment = async (req, res) => {
  try {
    const status = Math.random() > 0.2 ? 'APROVADO' : 'RECUSADO';
    res.json({ status });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};