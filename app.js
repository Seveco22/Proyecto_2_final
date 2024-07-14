const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const session = require('express-session');
const flash = require('connect-flash');
const passport = require('passport');
const sequelize = require('./config/database');
const productRoutes = require('./routes/products');
const userRoutes = require('./routes/users').router;
const categoryRoutes = require('./routes/categories');
require('./config/passportConfig')(passport);

const app = express();

// Set the view engine to ejs
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Middleware for static files and body parsing
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({ extended: false }));

// Express session middleware
app.use(session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true
}));

// Connect-flash middleware
app.use(flash());

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

// Global variables
app.use((req, res, next) => {
    res.locals.user = req.user || null;
    res.locals.success_msg = req.flash('success_msg');
    res.locals.error_msg = req.flash('error_msg');
    res.locals.error = req.flash('error');
    next();
});

// Home route
app.get('/', (req, res) => {
    res.render('index');
});

// Product routes
app.use('/products', productRoutes);

// User routes
app.use('/users', userRoutes);

// Category routes
app.use('/categories', categoryRoutes);

sequelize.sync({ force: true }) // force: true drops the table if it already exist
    .then(() => {
        app.listen(3000, () => {
            console.log('Server is running on http://localhost:3000');
        });
    })
    .catch(err => console.log('Error: ' + err));
