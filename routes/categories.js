const express = require('express');
const router = express.Router();
const categoryController = require('../controllers/categoryController');
const { ensureAuthenticated } = require('./users');

router.get('/', ensureAuthenticated, categoryController.getCategories);
router.get('/create', ensureAuthenticated, (req, res) => res.render('createCategory'));
router.post('/create', ensureAuthenticated, categoryController.createCategory);
router.get('/edit/:id', ensureAuthenticated, categoryController.getEditCategory);
router.post('/edit/:id', ensureAuthenticated, categoryController.updateCategory);
router.post('/delete/:id', ensureAuthenticated, categoryController.deleteCategory);

module.exports = router;
