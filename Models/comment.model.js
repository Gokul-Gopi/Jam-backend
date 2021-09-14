const mongoose = require('mongoose');
const { Schema } = mongoose;

const commentSchema = new Schema({

    postID: {
        type: Schema.Types.ObjectId,
        ref: 'Post',
    },

    userID: {
        type: Schema.Types.ObjectId,
        ref: 'User',
    },

    userName: {
        type: String,
        required: 'userName is reuired'
    },

    text: {
        type: String,
        trim: true,
        required: 'Text is reuired'
    },
});

const Comment = mongoose.model('Comment', commentSchema);
module.exports = Comment;