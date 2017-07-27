const Blog = require('../models/blog');
const User = require('../models/user');

exports.newBlog = async (req, res) => {
    const { title, body, createdBy } = req.body;
    if (!title || !body || !createdBy) {
        return res.json({ success: false, message: 'Post must include a title, body, and author' });
    }
    const blog = await (new Blog({ title, body, createdBy })).save();
    return res.json({ success: true, message: 'Blog posted!', blog });
};

exports.getBlogs = async (req, res) => {
    const blogs = await Blog.find({}).sort({ 'createdAt': -1 })
    return res.json({ success: true, blogs });
};

exports.getBlogById = async (req, res) => {
    if (!req.params.id) {
        return res.json({ success: false, message: 'No blog id was provided' });
    }
    const blog = await Blog.findById(req.params.id);

    if (!blog) {
        return res.json({ success: false, message: 'Whoops! That blog doesn\'t exist' });
    }
    return res.json({ success: true, blog });
};

exports.updateBlog = async (req, res) => {
    if (!req.body._id) {
        return res.json({ success: false, message: 'No blog id was provided' });
    }
    const blog = await Blog.findById(req.body._id);

    if (!blog) {
        return res.json({ success: false, message: 'Whoops! That blog doesn\'t exist' });
    }

    const requestUser = await User.findById(req.decoded.userId);

    if (!requestUser || requestUser.username !== blog.createdBy) {
        return res.json({ success: false, message: 'That action is not permitted' });
    }

    blog.title = req.body.title;
    blog.body = req.body.body;
    await blog.save();

    return res.json({ success: true, message: 'Blog updated!' });
};

exports.deleteBlog = async (req, res) => {
    if (!req.params.id) {
        return res.json({ success: false, message: 'No blog id was provided' });
    }

    const blog = await Blog.findById(req.params.id);

    if (!blog) {
        return res.json({ success: false, message: 'Whoops! That blog doesn\'t exist' });
    }

    const requestUser = await User.findById(req.decoded.userId);

    if (!requestUser || requestUser.username !== blog.createdBy) {
        return res.json({ success: false, message: 'That action is not permitted' });
    }

    await blog.remove();

    return res.json({ success: true, message: 'Blog deleted!' });
};

exports.likeBlog = async (req, res) => {
    if (!req.body.id) {
        return res.json({ success: false, message: 'No blog id was provided' });
    }

    const blog = await Blog.findById(req.body.id);
    const user = await User.findById(req.decoded.userId);

    if (!blog) {
        return res.json({ success: false, message: 'Whoops! That blog doesn\'t exist' });
    }

    if (blog.createdBy === user.username) {
        return res.json({ success: false, message: 'You can\'t like your own post' });
    }

    if (blog.likedBy.includes(user.username)) {
        return res.json({ success: false, message: 'You already liked this post' });
    }

    // check if it's alread been disliked
    const dislikedIndex = blog.dislikedBy.indexOf(user.username);
    if (dislikedIndex > -1) {
        blog.dislikedBy.splice(dislikedIndex, 1);
    }

    blog.likedBy.push(user.username);
    await blog.save();

    return res.json({ success: true, message: 'Blog liked', blog })
};

exports.dislikeBlog = async (req, res) => {
    if (!req.body.id) {
        return res.json({ success: false, message: 'No blog id was provided' });
    }

    const blog = await Blog.findById(req.body.id);
    const user = await User.findById(req.decoded.userId);

    if (!blog) {
        return res.json({ success: false, message: 'Whoops! That blog doesn\'t exist' });
    }

    if (blog.createdBy === user.username) {
        return res.json({ success: false, message: 'You can\'t dislike your own post' });
    }

    if (blog.dislikedBy.includes(user.username)) {
        return res.json({ success: false, message: 'You already disliked this post' });
    }

    // check if it's alread been liked
    const likedIndex = blog.likedBy.indexOf(user.username);
    if (likedIndex > -1) {
        blog.likedBy.splice(likedIndex, 1);
    }

    blog.dislikedBy.push(user.username);
    await blog.save();

    return res.json({ success: true, message: 'Blog disliked', blog })
};

exports.postComment = async (req, res) => {
    const { comments, id } = req.body;
    if (!comments || !id) {
        return res.json({ success: false, message: 'comments and blog id are required' });
    }

    const blog = await Blog.findById(id);
    const user = await User.findById(req.decoded.userId).select('username').exec();

    if (!blog) {
        return res.json({ success: false, message: 'Whoops! That blog doesn\'t exist' });
    }

    blog.comments.push({ comment: comments, commentor: user.username });

    await blog.save();

    return res.json({ success: true, message: 'Comment posted', blog });
}