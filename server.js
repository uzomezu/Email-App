const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const next = require('next');

require('dotenv').config(); //enviornment variables

const dev = process.env.NODE_ENV !== 'production';

const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare().then(()=>{
    const server = express();
    server.use(cors());
    server.use(express.json());
    server.all("*", (req,res)=>{
        return handle(req,res);
    });
    //Mongoose Connection
    mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true, 
            useUnifiedTopology: true, 
            // useFindAndModify: true, 
            // useCreateIndex: true
    }, (err,response)=>{
        if(err) throw err
        console.log("Mongoose is connected!");
    })
    //
    server.listen(process.env.PORT, (err, result)=>{
        if (err) { throw err }
        console.log('Your Server is Running on PORT: %s!', process.env.PORT)
    })
}).catch((ex)=>{
    console.log(ex.stack);
    process.exit(1);
})