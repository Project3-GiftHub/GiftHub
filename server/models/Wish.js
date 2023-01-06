const { Schema, model } = require('mongoose');

const wishSchema = new Schema(
    {
        item: {
            type: String,
            required: true
        },
    }
)

const Wish = model('Wish', wishSchema);

module.exports = Wish;