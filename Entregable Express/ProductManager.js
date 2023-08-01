const fs = require('fs').promises;

class ProductManager {
  constructor(filePath) {
    this.filePath = filePath;
  }

  async getAllProducts() {
    try {
      const data = await fs.readFile(this.filePath, 'utf8');
      return JSON.parse(data);
    } catch (error) {
      throw new Error('Error reading products file.');
    }
  }

  async getLimitedProducts(limit) {
    try {
      const data = await fs.readFile(this.filePath, 'utf8');
      const products = JSON.parse(data);
      return products.slice(0, limit);
    } catch (error) {
      throw new Error('Error reading products file.');
    }
  }
}

module.exports = ProductManager;
