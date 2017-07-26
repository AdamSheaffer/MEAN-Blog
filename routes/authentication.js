const { catchErrors } = require('../handlers/errorHandlers');
const authController = require('../controllers/authController');
const blogController = require('../controllers/blogController');

module.exports = (router) => {
    // Auth
    router.post('/register',
        catchErrors(authController.register),
        catchErrors(authController.login));
    router.get('/checkUsername/:username', catchErrors(authController.checkUsername));
    router.post('/login', catchErrors(authController.login));
    router.get('/profile',
        authController.verifyToken,
        catchErrors(authController.profile));

    // Blogs
    router.post('/newBlog',
        authController.verifyToken,
        catchErrors(blogController.newBlog)
    );

    router.get('/blogs',
        authController.verifyToken,
        catchErrors(blogController.getBlogs));

    router.get('/blogs/:id',
        authController.verifyToken,
        catchErrors(blogController.getBlogById));

    router.put('/blogs',
        authController.verifyToken,
        catchErrors(blogController.updateBlog));

    return router;
}