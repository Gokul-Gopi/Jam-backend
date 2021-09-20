const mongoose = require('mongoose');
const { Schema } = mongoose;

const childSchema = new Schema({
    comment: {
        type: Schema.Types.ObjectId,
        ref: 'Comment',
    }
});

const postSchema = new Schema({
    text: {
        type: String,
        trim: true
    },

    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },

    likes: [{
        type: Schema.Types.ObjectId,
        ref: 'User'
    }],

    comments: [childSchema],
});



const Post = mongoose.model('Post', postSchema);
module.exports = Post;