const User = require('../models/user');

module.exports = (router) => {
    router.post('/register', (req, res) => {
        if (!req.body.email) {
            return res.json({
                success: false,
                message: 'You must provide an email'
            });
        }
        if (!req.body.username) {
            return res.json({
                success: false,
                message: 'You must provide a username'
            });
        }
        if (!req.body.password) {
            return res.json({
                success: false,
                message: 'You must provide a password'
            });
        }

        const user = new User({
            email: req.body.email.toLowerCase(),
            username: req.body.username.toLowerCase(),
            password: req.body.password
        })
        user.save((err) => {
            if (err) {
                if (err.code === 11000) {
                    return res.json({
                        success: false,
                        message: 'Username or email already exists'
                    });
                }
                return res.json({
                    success: false,
                    message: 'Could not save user',
                    err
                });
            }
            return res.json({
                success: true,
                message: 'Account created!'
            });
        })
    });

    router.get('/checkUsername/:username', async(req, res) => {
        if (!req.params.username) {
            return res.json({
                success: false,
                message: 'No username provided'
            });
        }

        try {
            const user = await User.findOne({
                username: req.params.username.toLowerCase()
            });

            if (!!user) {
                return res.json({
                    success: false,
                    message: 'That username is already taken'
                });
            }

            return res.json({
                success: true
            });

        } catch (err) {
            return res.json({
                success: false,
                message: err
            });
        }
    });

    router.post('/login', async(req, res) => {
        if (!req.body.username || !req.body.password) {
            return res.json({
                success: false,
                message: 'A username and password are required'
            });
        }
        try {
            const user = await User.findOne({
                username: req.body.username.toLowerCase()
            });
            if (!user) {
                return res.json({
                    success: false,
                    message: 'Username not found'
                });

            }
            const isValidPassword = user.comparePassword(req.body.password);
            if (!isValidPassword) {
                return res.json({
                    success: false,
                    message: 'Invalid username or password'
                });
            }

            return res.json({
                success: true,
                message: `welcome ${user.username}!`
            });

        } catch (err) {
            return res.json({
                success: false,
                message: err
            });
        }

    });

    return router;
}