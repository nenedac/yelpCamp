const User = require('../models/user');

module.exports.renderRegister = (req, res) => {
    res.render('users/register');
};

const loginUser = (req, user) => {
    return new Promise((resolve, reject) => {
        req.login(user, (err) => {
            if (err) reject(err);
            else resolve();
        });
    });
};

module.exports.register = async (req, res, next) => {
    const { email, username, password } = req.body;

    try {
        const user = new User({ email, username });
        const registeredUser = await User.register(user, password);

        await loginUser(req, registeredUser);

        req.flash('success', 'Welcome to Yelp Camp!');
        res.redirect('/campgrounds');
    } catch (error) {
        req.flash('error', error.message);
        res.redirect('register');
    }
};

module.exports.renderLogin = (req, res) => {
    res.render('users/login');
};

module.exports.login = (req, res) => {
    req.flash('Success', 'Welcome back!');
    const redirectUrl = res.locals.returnTo || '/campgrounds';
    delete req.session.returnTo;
    res.redirect(redirectUrl);
};

module.exports.logout = (req, res, next) => {
    req.logout(function (err) {
        if (err) {
            return next(err);
        }
        req.flash('Success', 'Goodbye!');
        res.redirect('/campgrounds');
    });
};