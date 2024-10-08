const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcryptjs');
const User = require('./database').User;

module.exports = function (passport) {
    passport.use(new LocalStrategy((username, password, done) => {
        User.findOne({ where: { username } })
            .then(user => {
                if (!user) return done(null, false, { message: 'User not found' });

                bcrypt.compare(password, user.password, (err, isMatch) => {
                    if (err) throw err;
                    if (isMatch) return done(null, user);
                    return done(null, false, { message: 'Incorrect password' });
                });
            })
            .catch(err => done(err));
    }));

    passport.serializeUser((user, done) => done(null, user.id));

    passport.deserializeUser((id, done) => {
        User.findByPk(id)
            .then(user => done(null, user))
            .catch(err => done(err));
    });
};
