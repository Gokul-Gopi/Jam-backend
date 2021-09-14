const mongoose = require('mongoose');
const { Schema } = mongoose;

const nortificationSchema = new Schema({

    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },

    allNortifications: [{
        text: {
            type: String
        }
    }],


});

const Nortification = mongoose.model('Nortification', nortificationSchema);
module.exports = Nortification;