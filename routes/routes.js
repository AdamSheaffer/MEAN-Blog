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

    router.get('/user/:username',
        authController.verifyToken,
        catchErrors(authController.publicProfile));

    // Blogs
    router.post('/newBlog',
        authController.verifyToken,
        catchErrors(blogController.newBlog));

    router.get('/blogs',
        authController.verifyToken,
        catchErrors(blogController.getBlogs));

    router.get('/blogs/:id',
        authController.verifyToken,
        catchErrors(blogController.getBlogById));

    router.put('/edit',
        authController.verifyToken,
        catchErrors(blogController.updateBlog));

    router.delete('/delete/:id',
        authController.verifyToken,
        catchErrors(blogController.deleteBlog));

    router.put('/likeblog',
        authController.verifyToken,
        catchErrors(blogController.likeBlog));

    router.put('/dislikeblog',
        authController.verifyToken,
        catchErrors(blogController.dislikeBlog));

    router.post('/comment',
        authController.verifyToken,
        catchErrors(blogController.postComment));

    return router;
}