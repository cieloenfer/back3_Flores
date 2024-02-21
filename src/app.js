const express = require('express');
const ProductManager = require('./ProductManager');

const app = express();
const PORT = 8080;

const productManager = new ProductManager('./products.json');

app.get('/products', async (req, res) => {
  try {
    const { limit } = req.query;
    const products = await productManager.getAllProducts();

    if (limit) {
      res.json(products.slice(0, parseInt(limit, 10)));
    } else {
      res.json({ products });
    }
  } catch (error) {
    res.status(500).json({ error: 'Error interno del servidor' });
  }
});

app.get('/products/:pid', async (req, res) => {
  try {
    const productId = parseInt(req.params.pid, 10);
    const products = await productManager.getAllProducts();
    const product = products.find(item => item.id === productId);

    if (product) {
      res.json(product);
    } else {
      res.status(404).json({ error: 'Producto no encontrado' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Error interno del servidor' });
  }
});

app.listen(PORT, () => {
  console.log(`Servidor escuchando en el puerto ${PORT}`);
});
