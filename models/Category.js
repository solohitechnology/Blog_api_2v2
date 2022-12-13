const mongoose = require('mongoose');

const CategorySchema = new mongoose.Schema(
    {
        name: {
            type: String,
            require: true,
        }
    },
    { timestamp: true }
);

module.exports = mongoose.Schema('Category', userSchema)