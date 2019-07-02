const express = require('express')
const api = express.Router()
const pass = require('../middlewares/auth')
const user = require('../controllers/user')

api.post('/auth/login', user.logIn)
api.post('/auth/signup', user.signUp)


const recipeController = require('../controllers/Recipe');
const ingredientController = require('../controllers/Ingredient.js');


// Create a new recipe
api.post('/recipe_new', recipeController.create);
//get one recipe
api.get('/recipe_get/:recipeId', recipeController.findOne);
//get all recipes
api.get('/recipe_all', recipeController.findAll);
//update a recipe
api.put('/recipe_update/:redipeId', recipeController.update);
//delete a recipe
api.delete('/recipe_delete/:recipeId', recipeController.deleteOne);

//#########   INGREDIENTS ROUTINGS   ##########//

//create a ingredient
api.post('/ingredient_new', ingredientController.create);
//get one ingredient
api.get('/ingredient_get/:ingredientId', ingredientController.findOne);
//get all ingredient
api.get('/ingredient_all', ingredientController.findAll);
//update a ingredient
api.put('/ingredient_update/:ingredientId', ingredientController.update);
//delete a ingredient
api.delete('/ingredient_delete/:ingredientId', ingredientController.deleteOne);


module.exports = {
    api
}