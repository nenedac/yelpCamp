const express = require('express');
const router = express.Router();
const passport = require('passport');
const catchAsync = require('../utils/catchAsync');
const User = require('../models/user');
const { storeReturnTo } = require('../middleware');

router.get('/register', (req, res) => {
    res.render('users/register');
});

const registerUser = async (email, username, password) => {
    const user = new User({ email, username });
    return await User.register(user, password);
};

// Separate the login logic into its own function
const loginUser = (req, user) => {
    return new Promise((resolve, reject) => {
        req.login(user, (err) => {
            if (err) reject(err);
            resolve();
        });
    });
};

router.post('/register', catchAsync(async (req, res, next) => {
    const { email, username, password } = req.body;

    try {
        const registeredUser = await registerUser(email, username, password);
        await loginUser(req, registeredUser);

        req.flash('success', 'Welcome to Yelp Camp!');
        res.redirect('/campgrounds');
    } catch (error) {
        req.flash('error', error.message);
        res.redirect('register');
    }
}));

router.get('/login', (req, res) => {
    res.render('users/login');
});

router.post('/login', storeReturnTo, passport.authenticate('local', { failureFlash: true, failureRedirect: '/login' }), (req, res) => {
    req.flash('Success', 'Welcome back!');
    const redirectUrl = res.locals.returnTo || '/campgrounds';
    delete req.session.returnTo;
    res.redirect(redirectUrl);
});

router.get('/logout', (req, res, next) => {
    req.logout(function (err) {
        if (err) {
            return next(err);
        }
        req.flash('success', 'Goodbye!');
        res.redirect('/campgrounds');
    });
});


module.exports = router;