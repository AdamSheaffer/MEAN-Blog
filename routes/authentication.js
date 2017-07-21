const { catchErrors } = require('../handlers/errorHandlers');
const authController = require('../controllers/authController');
const blogController = require('../controllers/blogController');

module.exports = (router) => {
    // Auth
    router.post('/register', authController.register);
    router.get('/checkUsername/:username', authController.checkUsername);
    router.post('/login', authController.login);
    router.get('/profile',
        authController.verifyToken,
        authController.profile);

    // Blogs
    router.post('/newBlog',
        //authController.verifyToken,
        catchErrors(blogController.newBlog)
    );

    return router;
}