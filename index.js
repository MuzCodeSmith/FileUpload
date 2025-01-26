const express = require('express');
require('dotenv').config()
require('./config/database').connectDB();
const app = express();

const PORT = process.env.PORT || 3000;

// middlewares
app.use(express.json());

// default route
app.get('/',(req,res)=>{
    res.send("<h1>Home</h1>")
})

app.listen(PORT,()=>{
    console.log("App Started on port: ",PORT)
})