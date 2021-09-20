const mongoose = require('mongoose');
const { Schema } = mongoose
const bcrypt = require('bcrypt')

const userSchema = new Schema({
    firstName: {
        type: String,
        trim: true,
        required: 'Firstname is required'
    },

    lastName: {
        type: String,
        trim: true,
    },

    userName: {
        type: String,
        trim: true,
        unique: 'Username must be unique',
        required: 'Firstname is required'
    },

    bio: {
        type: String,
        trim: true,
    },

    email: {
        type: String,
        trim: true,
        unique: 'e-mail must be unique',
        required: 'e-mail is required',
    },

    password: {
        type: String,
        trim: true,
        validate: {
            validator: function (v) {
                return v.length > 7 && /\d+/.test(v)
            },
            message: props => `Minimum 8 characters long and must contain a number`
        },
        required: 'Password is required',
    },

    posts: [{
        type: Schema.Types.ObjectId,
        ref: 'Post'
    }],

    followers: [{
        type: Schema.Types.ObjectId,
        ref: 'User'
    }]

}, { timestamps: true })



// userSchema.pre('save', async function (next) {
//     const salt = await bcrypt.genSalt()
//     this.password = await bcrypt.hash(this.password, salt)
//     next()
// })

const user = mongoose.model('User', userSchema)
module.exports = user;