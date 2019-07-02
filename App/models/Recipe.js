const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const RecipeSchema = mongoose.Schema({
    Name: {
        type: String,
        require: true,
    },
    Description: {
        type: String,
    },
    Ingredient: [{
        type: Schema.Types.ObjectId,
        ref: 'ingredient'
    }],
    Category: {
        type: String,
        require: true
    }
}, {
    versionKey: false,
    timestamps: true
});

module.exports = mongoose.model('recipe', RecipeSchema);

