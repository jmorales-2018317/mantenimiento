'use strict'

const mongoose = require('mongoose');

const categorySchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        uppercase: true
    },
    description: {
        type: String,
        require: false
    }
}, {
    versionKey: false
});

module.exports = mongoose.model('Category', categorySchema);