const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');
const Category = require('../models/Category');
const { ensureAuthenticated } = require('./users'); // Asegúrate de que esta ruta sea correcta

router.get('/', ensureAuthenticated, productController.getProducts);
router.get('/create', ensureAuthenticated, async (req, res) => {
    const categories = await Category.findAll();
    res.render('createProduct', { categories });
});
router.post('/create', ensureAuthenticated, productController.createProduct);
router.get('/edit/:id', ensureAuthenticated, productController.getEditProduct);
router.post('/edit/:id', ensureAuthenticated, productController.updateProduct);
router.post('/delete/:id', ensureAuthenticated, productController.deleteProduct);

module.exports = router;
