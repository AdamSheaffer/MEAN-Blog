const Blog = require('../models/blog');
const User = require('../models/user');

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

exports.getBlogs = async (req, res) => {
    const blogs = await Blog.find({}).sort({ 'createdAt': -1 })
    return res.json({
        success: true,
        blogs
    });
};

exports.getBlogById = async (req, res) => {
    if (!req.params.id) {
        return res.json({
            success: false,
            message: 'No blog id was provided'
        });
    }
    const blog = await Blog.findById(req.params.id);

    if (!blog) {
        return res.json({
            success: false,
            message: 'Whoops! That blog doesn\'t exist'
        });
    }
    return res.json({
        success: true,
        blog
    });
};

exports.updateBlog = async (req, res) => {
    if (!req.body._id) {
        return res.json({
            success: false,
            message: 'No blog id was provided'
        });
    }
    const blog = await Blog.findById(req.body._id);

    if (!blog) {
        return res.json({
            success: false,
            message: 'Whoops! That blog doesn\'t exist'
        });
    }

    const requestUser = await User.findById(req.decoded.userId);

    if (!requestUser || requestUser.username !== blog.createdBy) {
        return res.json({
            success: false,
            message: 'That action is not permitted'
        });
    }

    blog.title = req.body.title;
    blog.body = req.body.body;
    await blog.save();

    return res.json({
        success: true,
        message: 'Blog updated!'
    });
};