const Recipe = require('../model/Recipe')


function create(req, res){
    if(!req.body) {
        return res.status(400).send({
            message: "Imput something Cyka Blyat"
        });
    } 
    // Create a recipe Object
    const recipe = new Recipe({
        Name: req.body.Name,
        Description: req.body.Description,
        Category: req.body.Category,
        Ingredient: req.body.Ingredient

    });
    //this is a change
    // Save the recipe in the database
    recipe.save()
        .then(data => {
            res.send(data);
        }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while creating the Task."
        });
    }); 
}

    function findAll(req, res){

        Recipe.find()
            .then(data => {
                res.send(data);
            }).catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving recipes, damn Vadim blyat."
            });
        });    
    }

    function findOne(req, res){

        Recipe.findById(req.params.recipeId)
            .then(data => {
                if(!data) {
                    return res.status(404).send({
                        message: "Recipe not found with id " + req.params.recipeId
                    });
                }
                res.send(data);
            }).catch(err => {
            if(err.kind === 'ObjectId') {
                return res.status(404).send({
                    message: "Recipe not found with id " + req.params.recipeId
                });
            }
            return res.status(500).send({
                message: "Error retrieving recipe with id " + req.params.recipeId
            });
        });
    
    }


    function update(req, res){

        if(!req.body) {
            return res.status(400).send({
                message: "Recipe content can not be empty"
            });
        }
    
        // Find Task and update it with the request body
        Recipe.findByIdAndUpdate(req.params.recipeId, {
            Name: req.body.Name,
            Description: req.body.Description,
            Category: req.body.Category
        }, {new: true})
            .then(data => {
                if(!data) {
                    return res.status(404).send({
                        message: "Recipe not found with id " + req.params.recipeId
                    });
                }
                res.send(data);
            }).catch(err => {
            if(err.kind === 'ObjectId') {
                return res.status(404).send({
                    message: "Recipe not found with id " + req.params.recipeId
                });
            }
            return res.status(500).send({
                message: "Error updating recipe with id " + req.params.recipeId
            });
        });

    }
        
    function deleteOne(req, res){

        Recipe.findOneAndDelete(req.params.recipeId)
        .then(data => {
            res.send(data);
        }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while deleting recipes, damn Vadim blyat."
        });
    });    
}

    
    


module.exports = {
    create,
    findAll,
    findOne,
    update,
    deleteOne
}