const { registerUser } = require('../controllers/userController');
const User = require('../config/database').User;

module.exports = async () => {
    try {
        await registerUser('admin', 'admin');
        await User.update({ role: 'admin' }, { where: { username: 'admin' } });
    } catch (err) { }
}

