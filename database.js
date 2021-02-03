import mongoose from 'mongoose';
import 'dotenv/config';

let { DB_USER, DB_PASS, DB_NAME, DB_HOST, DB_PORT } = process.env;

mongoose
.connect(`mongodb://${DB_USER}:${DB_PASS}@${DB_HOST}:${DB_PORT}/${DB_NAME}?socketTimeoutMS=90000"`, {
    useNewUrlParser: true ,
    useUnifiedTopology: true 
})
.then( db => console.log(`Database ${DB_NAME} connected successfully....`)) 
.catch( error => console.log(error)) 