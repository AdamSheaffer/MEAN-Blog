const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

const Schema = mongoose.Schema;

// TODO: Change `createdBy` to a reference to a user object.
const blogSchema = new Schema({
    title: {
        type: String,
        required: true,
        maxlength: 100
    },
    body: {
        type: String,
        required: true,
        maxlength: 10000
    },
    createdBy: {
        type: String
    },
    createdAt: {
        type: Date,
        default: Date.now()
    },
    likedBy: {
        type: Array
    },
    dislikedBy: {
        type: Array
    },
    comments: [{
        comment: {
            type: String,
            maxlength: 1000
        },
        commentor: {
            type: String
        }
    }]
});

module.exports = mongoose.model('Blog', blogSchema);