const express = require('express');
const ProductManager = require('./ProductManager');

const app = express();
const PORT = 3000;
const PRODUCTS_FILE = 'products.json';

const productManager = new ProductManager(PRODUCTS_FILE);

app.get('/products', async (req, res) => {
    try {
        const limit = parseInt(req.query.limit, 10);

        if (isNaN(limit)) {
            const allProducts = await productManager.getAllProducts();
            res.json(allProducts);
        } else {

            const limitedProducts = await productManager.getLimitedProducts(limit);
            res.json(limitedProducts);
        }
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
});
app.get('/products/:pid', async (req, res) => {
    try {
        const productId = req.params.pid;
        const allProducts = await productManager.getAllProducts();
        const product = allProducts.find(product => product.id === productId);

        if (product) {
            res.json(product);
        } else {
            res.status(404).json({ error: 'Product not found' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
});
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
