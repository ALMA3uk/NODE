const express = require('express');
const userController = require('../controllers/userController');
const userRouter = express.Router();

userRouter.get('/register', userController.register);
userRouter.post('/register', userController.postRegister);
userRouter.get('/login', userController.login);
userRouter.post('/login', userController.postLogin);
userRouter.get('/logout', userController.logout);

module.exports = userRouter;
