import express from "express";
import bodyParser from "body-parser";
import logger from "morgan";
import helmet from "helmet";
import routes from './routes';
import pkg from './package.json';
import './database';
import 'dotenv/config';
//mongoose = require('mongoose'),

// config initial for use file .env
//var usersRouter = require('./routes/users');

let api = express();
api.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
    next();
});


api.use(bodyParser.urlencoded({ extended: false }));
 
// parse various different custom JSON types as JSON
api.use(bodyParser.json({ type: "application/*+json" }));
api.use(express.json());

api.set("pkg", pkg);
api.use(logger('dev'));
api.use(helmet());
api.use(routes);
// parse application/x-www-form-urlencoded

api.use((err , req, res, next) => {
    console.error(err);
    res.status(err.status || 500);
    res.json({ 
        message: err.message,
        code: err.status,
        error: {
            details: err.errors
        }
    });
  });

api.listen(  process.env.PORT || 3000, () => {
    console.log(`Welcome to API ${process.env.APP_NAME}`);
    console.log(`running port: ${process.env.PORT || 3000}`);
}); 

export default api;