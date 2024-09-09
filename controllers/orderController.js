const Order = require('../config/database').Order;
const User = require('../config/database').User;

// Просмотр всех заказов
exports.getOrders = async (req, res) => {
    try {
        const orders = await Order.findAll({ raw: true });
        res.render('orders', { orders, title: 'Orders' });
    } catch (err) {
        console.log(err);
    }
}

// Страница создания нового заказа
exports.getCreateOrder = (req, res) => {
    res.render('createOrder', { title: 'Create Order' });
}

// Создание нового заказа
exports.postOrder = async (req, res) => {
    const { title, description, price } = req.body;
    const image = req.file ? req.file.filename : null;
    const userId = req.user.id;
    try {
        await Order.create({ title, description, image, price, userId });
        res.redirect('/orders');
    } catch (err) {
        console.log(err);
    }
}

// Просмотр отдельного заказа
exports.getOrder = async (req, res) => {
    try {
        const order = await Order.findByPk(req.params.id, {
            include: [{ model: User, attributes: ['username'] }]
        });
        if (!order) return res.status(404).render('404');
        res.render('order', { order: order.toJSON(), user: order.User.toJSON(), title: 'Order' });
    } catch (err) {
        console.log(err);
    }
}

// Удаление заказа
exports.deleteOrder = async (req, res) => {
    try {
        const order = await Order.findByPk(req.params.id);
        if (!order) return res.status(404).send();
        await order.destroy();
        res.status(200).send();
    } catch (err) {
        console.log(err);
    }
}

// Просмотр редактирования заказа
exports.getEditOrder = async (req, res) => {
    try {
        const order = await Order.findByPk(req.params.id, { raw: true });
        if (!order) return res.status(404).render('404');
        res.render('editOrder', { order, title: 'Edit Order' });
    } catch (err) {
        console.log(err);
    }
}

// Редактирование заказа
exports.editOrder = async (req, res) => {
    const { title, description, price } = req.body;
    const image = req.file ? req.file.filename : req.body.oldImage;

    try {
        const order = await Order.findByPk(req.params.id);
        if (!order) return res.status(404).send();
        await order.update({ title, description, image, price });
        res.status(200).send();
    } catch (err) {
        console.log(err);
    }
}

