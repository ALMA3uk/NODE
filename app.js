require('dotenv').config();
const express = require('express');
const session = require('express-session');
const flash = require('connect-flash');
const expressHbs = require('express-handlebars');
const passport = require('passport');
const { sequelize } = require('./config/database');

const app = express();

app.use(express.static('public'));

require('./config/passportConfig')(passport);

app.set('view engine', 'hbs');
app.engine('hbs', expressHbs.engine({
    layoutsDir: 'views/layouts/',
    defaultLayout: 'main',
    extname: 'hbs'
}));

app.use(express.urlencoded({ extended: false }));

app.use(session({
    secret: process.env.SECRET_SESSION_KEY || 'secret',
    resave: false,
    saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());

app.use(flash());

app.use((req, res, next) => {
    res.locals.isAuthenticated = req.isAuthenticated();
    res.locals.user = req.user;
    res.locals.isAdmin = req.user ? req.user.role === 'admin' : false;
    next();
});

app.use('/', require('./routes/userRouter'));
app.use('/orders', require('./routes/orderRouter'));

app.use((req, res) => { res.status(404).render('404', { message: 'Page Not Found' }); });

process.on('SIGINT', () => {
    sequelize.close().then(() => { process.exit(); });
}).on('SIGTERM', () => {
    sequelize.close().then(() => { process.exit(); });
});

sequelize.sync({ force: false }).then(() => {
    if (process.env.NODE_ENV === 'development') { require('./utils/createAdmin')(); }
    app.listen(3000, () => {
        console.log(`Server is running on http://localhost:3000/orders`);
    });
});
