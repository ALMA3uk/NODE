const passport = require('passport');
const bcrypt = require('bcryptjs');
const User = require('../config/database').User;

// Страница регистрации
exports.register = (req, res) => {
    res.render('register', { title: 'Register' });
};

// Регистрация
exports.postRegister = async (req, res) => {
    const { username, password } = req.body;
    try {
        const user = await User.findOne({ where: { username } });
        if (user) {
            req.flash('error_msg', 'Username already exists');
            return res.redirect('/register');
        }

        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(password, salt);
        await User.create({ username, password: hash });

        passport.authenticate('local', {
            successRedirect: '/orders',
            failureRedirect: '/register',
            failureFlash: true
        })(req, res);
    } catch (err) {
        console.log(err);
    }
};

// Страница входа
exports.login = (req, res) => {
    res.render('login', { title: 'Login' });
};

// Логин
exports.postLogin = (req, res, next) => {
    passport.authenticate('local', {
        successRedirect: '/orders',
        failureRedirect: '/login',
        failureFlash: true
    })(req, res, next);
};

// Логаут
exports.logout = (req, res) => {
    req.logout(() => {
        req.flash('success_msg', 'You are logged out');
        res.redirect('/orders');
    });
};

