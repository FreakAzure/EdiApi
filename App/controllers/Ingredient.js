const Ingredient = require('../models/Ingredient')


function create(req, res){
    if(!req.body) {
        return res.status(400).send({
            message: "Imput something Cyka Blyat"
        });
    } 
    // Create a recipe Object
    const ingredient = new Ingredient({
        Name: req.body.Name,
        Description: req.body.Description,

    });
    //this is a change
    // Save the recipe in the database
    ingredient.save()
        .then(data => {
            res.send(data);
        }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while creating the Task."
        });
    }); 
}

    function findAll(req, res){

        Ingredient.find()
            .then(data => {
                res.send(data);
            }).catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving recipes, damn Vadim blyat."
            });
        });    
    }

    function findOne(req, res){

        Ingredient.findById(req.params.ingredientId)
            .then(data => {
                if(!data) {
                    return res.status(404).send({
                        message: "Recipe not found with id " + req.params.igredientId
                    });
                }
                res.send(data);
            }).catch(err => {
            if(err.kind === 'ObjectId') {
                return res.status(404).send({
                    message: "Recipe not found with id " + req.params.ingredientId
                });
            }
            return res.status(500).send({
                message: "Error retrieving recipe with id " + req.params.ingredientId
            });
        });
    
    }


    function update(req, res){

        if(!req.body) {
            return res.status(400).send({
                message: "Task content can not be empty"
            });
        }
    
        // Find Task and update it with the request body
        Ingredient.findByIdAndUpdate(req.params.ingredientId, {
            Name: req.body.Name,
            Description: req.body.Description,
        }, {new: true})
            .then(data => {
                if(!data) {
                    return res.status(404).send({
                        message: "Task not found with id " + req.params.IngredientId
                    });
                }
                res.send(data);
            }).catch(err => {
            if(err.kind === 'ObjectId') {
                return res.status(404).send({
                    message: "Task not found with id " + req.params.ingredientId
                });
            }
            return res.status(500).send({
                message: "Error updating task with id " + req.params.ingredientId
            });
        });

    }

    function deleteOne(req, res){

        if(!req.params.ingredientId){
            return res.status(400).send({
                message: "Imput something Cyka Blyat"
            });
        }
        
        Ingredient.findOneAndRemove(req.params.ingredientId)
        .then(data => {
            res.send(data);
        }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred deleting the ingredient"
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