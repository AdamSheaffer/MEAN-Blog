const User = require('../models/user');
const jwt = require('jsonwebtoken');
const authController = require('../controllers/authController');

module.exports = (router) => {
    router.post('/register', authController.register);
    router.get('/checkUsername/:username', authController.checkUsername);
    router.post('/login', authController.login);
    router.get('/profile',
        authController.verifyToken,
        authController.profile);

    return router;
}