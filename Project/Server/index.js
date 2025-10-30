const express = require('express');
const dbconfig = require('./dbconfig.js');
const dotEnv = require('dotenv');
dotEnv.config();

const app = express();
dbconfig.connectDb();

app.get('/',(req,res)=>{
    res.send('Hello World!');
})

app.listen(8001,()=>{
    console.log('Server is running on port 8001');
})