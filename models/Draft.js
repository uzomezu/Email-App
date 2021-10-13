const mongoose = require('mongoose');

const Draft = new mongoose.Schema({
    subject : {
        type: String,
        required: true
    },
    body : {
        type: String,
        required: true,
    },
    recipients: [{
        type: String,
        unique: true, 
        index: true,
        dropDups: true
    }],
    sent: {type: Boolean, default: false}
})

const draftSchema = mongoose.model("Draft", Draft);

module.exports = draftSchema;