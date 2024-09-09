const express = require('express');
const orderController = require('../controllers/orderController');
const orderRouter = express.Router();
const multer = require('../config/multerConfig');
const { ensureAuthenticated, ensureAdmin } = require('../middleware/auth');

orderRouter.get('/', orderController.getOrders);
orderRouter.get('/create', ensureAuthenticated, orderController.getCreateOrder);
orderRouter.post('/create', ensureAuthenticated, multer, orderController.postOrder);
orderRouter.get('/:id', orderController.getOrder);
orderRouter.delete('/:id', ensureAdmin, orderController.deleteOrder);
orderRouter.get('/edit/:id', ensureAdmin, orderController.getEditOrder);
orderRouter.put('/:id', ensureAdmin, multer, orderController.editOrder);

module.exports = orderRouter;
