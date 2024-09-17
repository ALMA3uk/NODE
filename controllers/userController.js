const passport = require('passport');
const bcrypt = require('bcryptjs');
const User = require('../config/database').User;

// Страница регистрации
exports.register = (req, res) => {
    res.render('register', { title: 'Register' });
};

// Регистрация в БД
exports.registerUser = async (username, password) => {
    try {
        const user = await User.findOne({ where: { username } });
        if (user) { throw new Error('Username already exists'); }

        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(password, salt);
        await User.create({ username, password: hash });
    } catch (err) {
        console.log(err);
        throw err;
    }
};

// Регистрация
exports.postRegister = async (req, res) => {
    const { username, password } = req.body;
    try {
        await exports.registerUser(username, password);
        passport.authenticate('local', {
            successRedirect: '/orders',
            failureRedirect: '/register',
            failureFlash: true
        })(req, res);
    } catch (err) {
        req.flash('error_msg',);
        return res.redirect('/register');
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
