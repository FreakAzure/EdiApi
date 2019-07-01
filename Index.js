const express = require('express');
const bodyParser = require('body-parser');
// create express app
const app = express();
// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }))
// parse requests of content-type - application/json
app.use(bodyParser.json())
// define a simple route
// Configuring the database
const dbConfig = require('./config/database.config.js');
const mongoose = require('mongoose');

// Connecting to the database
mongoose.connect(dbConfig.url, { useNewUrlParser: true } ).then(() => {
    console.log("Successfully connected to the database");
  
    app.listen(3000, () => {
        console.log("Server is listening on port 3000");
    })    
     // Routing for all project
    const router = require('./App/Routes/Index')
    app.use('/api/edibl', router.api)

}).catch(err => {
    console.log('Could not connect to the database. Exiting now...', err);
    process.exit();
});
