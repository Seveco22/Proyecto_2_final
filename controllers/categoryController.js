const Category = require('../models/Category');

exports.insertExampleCategories = async () => {
    try {
        await Category.bulkCreate([
            { name: 'Electronics' },
            { name: 'Books' },
            { name: 'Clothing' }
        ]);
    } catch (err) {
        console.error('Error inserting example categories:', err);
    }
};

exports.getCategories = async (req, res) => {
    try {
        const categories = await Category.findAll();
        res.render('categories', { categories });
    } catch (err) {
        console.error('Error fetching categories:', err);
        res.status(500).send('Server error');
    }
};

exports.createCategory = async (req, res) => {
    const { name } = req.body;
    try {
        await Category.create({ name });
        res.redirect('/categories');
    } catch (err) {
        console.error('Error creating category:', err);
        res.status(500).send('Error creating category');
    }
};

exports.getEditCategory = async (req, res) => {
    const categoryId = req.params.id;
    try {
        const category = await Category.findByPk(categoryId);
        res.render('editCategory', { category });
    } catch (err) {
        console.error('Error fetching category:', err);
        res.status(500).send('Error fetching category');
    }
};

exports.updateCategory = async (req, res) => {
    const categoryId = req.params.id;
    const { name } = req.body;
    try {
        await Category.update({ name }, { where: { id: categoryId } });
        res.redirect('/categories');
    } catch (err) {
        console.error('Error updating category:', err);
        res.status(500).send('Error updating category');
    }
};

exports.deleteCategory = async (req, res) => {
    const categoryId = req.params.id;
    try {
        await Category.destroy({ where: { id: categoryId } });
        res.redirect('/categories');
    } catch (err) {
        console.error('Error deleting category:', err);
        res.status(500).send('Error deleting category');
    }
};
