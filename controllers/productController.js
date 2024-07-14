const Product = require('../models/Product');
const Category = require('../models/Category');

exports.insertExampleProducts = async () => {
    try {
        const category = await Category.findOne({ where: { name: 'Audio' } });
        await Product.bulkCreate([
            { name: 'TV', description: 'A large TV', price: 499.99, CategoryId: category.id },
            { name: 'Laptop', description: 'A powerful laptop', price: 899.99, CategoryId: category.id }
        ]);
    } catch (err) {
        console.error('Error inserting example products:', err);
    }
};

exports.createProduct = async (req, res) => {
    const { name, description, price, categoryId } = req.body;
    try {
        await Product.create({ name, description, price, CategoryId: categoryId });
        res.redirect('/products');
    } catch (error) {
        console.error('Error creating product:', error);
        res.status(500).send('Error creating product');
    }
};

exports.getProducts = async (req, res) => {
    try {
        const products = await Product.findAll({ include: Category });
        res.render('products', { products });
    } catch (error) {
        console.error('Error fetching products:', error);
        res.status(500).send('Error fetching products');
    }
};

exports.getEditProduct = async (req, res) => {
    const productId = req.params.id;
    try {
        const product = await Product.findByPk(productId);
        const categories = await Category.findAll();
        res.render('editProduct', { product, categories });
    } catch (error) {
        console.error('Error fetching product:', error);
        res.status(500).send('Error fetching product');
    }
};

exports.updateProduct = async (req, res) => {
    const productId = req.params.id;
    const { name, description, price, categoryId } = req.body;
    try {
        await Product.update({ name, description, price, CategoryId: categoryId }, { where: { id: productId } });
        res.redirect('/products');
    } catch (error) {
        console.error('Error updating product:', error);
        res.status(500).send('Error updating product');
    }
};

exports.deleteProduct = async (req, res) => {
    const productId = req.params.id;
    try {
        await Product.destroy({ where: { id: productId } });
        res.redirect('/products');
    } catch (error) {
        console.error('Error deleting product:', error);
        res.status(500).send('Error deleting product');
    }
};
