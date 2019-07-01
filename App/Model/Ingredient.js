const mongoose = require('mongoose');

const IngredientSchema = mongoose.Schema({
    Name: {
        type: String,
        require: true,
    },
    Description: {
        type: String,
    }
}, {
    versionKey: false,
    timestamps: true
});

module.exports = mongoose.model('ingredient', IngredientSchema);

