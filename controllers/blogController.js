const Blog = require('../models/blog');

exports.newBlog = async (req, res) => {
    const { title, body, createdBy } = req.body;
    if (!title || !body || !createdBy) {
        return res.json({
            success: false,
            message: 'Post must include a title, body, and author'
        });
    }
    const blog = await (new Blog({
        title,
        body,
        createdBy
    })).save();
    return res.json({
        success: true,
        message: 'Blog posted',
        blog
    });

};