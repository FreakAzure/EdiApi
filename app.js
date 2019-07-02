const dotenv = require('dotenv').config()
const express = require('express');
const bodyParser = require('body-parser');
const config = require('./config').get(process.env.NODE_ENV)
const cors = require('cors')
const passport = require('passport')
// create express app
const app = express();

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// parse requests of content-type - application/json
app.use(bodyParser.json());


// Configuring the database
const mongoose = require('mongoose');


// Connecting to the database
mongoose.connect(config.db, { useNewUrlParser: true } ).then(() => {
    console.log("Successfully connected to the database");

    /**
     * Routing for all project
     */

    app.listen(config.port, () => {
        console.log("Server is listening on port 3000");
    })

     const router = require('./app/routes/index')
     app.use('/api/v1/', router.api)
     app.use(function(req, res, next) {
        var err = new Error('Not Found')
        err.status = 404
        next(err)
     })
     app.use(function(err, req, res, next) {
        res.locals.message = err.message
        res.locals.error = req.app.get('env') === 'development' ? err : {}

        // render the error page
        res.status(err.status || 500)
        res.send("Invalid page")
     })

    var corsOption = {
        origin: true,
        methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
        credentials: true,
        exposedHeaders: ['x-auth-token', 'content-type', 'X-Requested-With', 'Authorization', 'Accept', 'Origin'],
    }
    app.use(cors(corsOption))
    app.use(bodyParser.urlencoded({
        extended: true
    }))
    app.use(bodyParser.json())
    app.use(passport.initialize())


}).catch(err => {
    console.log('Could not connect to the database. Exiting now...', err);
    process.exit();
});