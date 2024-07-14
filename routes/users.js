const express = require('express');
const bcrypt = require('bcryptjs');
const passport = require('passport');
const User = require('../models/User');
const router = express.Router();

// Middleware to ensure the user is authenticated
function ensureAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    req.flash('error_msg', 'Please log in to view that resource');
    res.redirect('/users/login');
}

router.get('/login', (req, res) => {
    res.render('login');
});

router.get('/register', (req, res) => {
    res.render('register', { errors: [] });
});

router.post('/register', async (req, res) => {
    const { email, password, password2 } = req.body;
    let errors = [];

    if (!email || !password || !password2) {
        errors.push({ msg: 'Please enter all fields' });
    }

    if (password !== password2) {
        errors.push({ msg: 'Passwords do not match' });
    }

    if (password.length < 6) {
        errors.push({ msg: 'Password must be at least 6 characters' });
    }

    if (errors.length > 0) {
        res.render('register', { errors, email, password, password2 });
    } else {
        try {
            const user = await User.findOne({ where: { email } });
            if (user) {
                errors.push({ msg: 'Email already exists' });
                res.render('register', { errors, email, password, password2 });
            } else {
                const newUser = await User.create({
                    email,
                    password: await bcrypt.hash(password, 10)
                });
                req.flash('success_msg', 'You are now registered and can log in');
                res.redirect('/users/login');
            }
        } catch (err) {
            console.error(err);
            res.status(500).send('Server error');
        }
    }
});

router.post('/login', (req, res, next) => {
    passport.authenticate('local', {
        successRedirect: '/users/dashboard',
        failureRedirect: '/users/login',
        failureFlash: true
    })(req, res, next);
});

router.get('/dashboard', ensureAuthenticated, (req, res) => {
    res.render('dashboard', { user: req.user });
});

router.get('/manage', ensureAuthenticated, async (req, res) => {
    try {
        const users = await User.findAll();
        res.render('manageUsers', { users });
    } catch (err) {
        console.error(err);
        res.status(500).send('Server error');
    }
});

router.get('/logout', (req, res) => {
    req.logout(err => {
        if (err) {
            return next(err);
        }
        req.flash('success_msg', 'You are logged out');
        res.redirect('/users/login');
    });
});

module.exports = {
    router,
    ensureAuthenticated
};
