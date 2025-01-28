const express = require('express');
require('dotenv').config()


const app = express();
const PORT = process.env.PORT || 3000;
const fileupload = require('express-fileupload')

// middlewares
app.use(express.json());
app.use(fileupload())

// database connection
require('./config/database').connectDB();

// cloudinary connection
require('./config/cloudinary').cloudinaryConnect();

// mounting routes
const upload = require('./routes/FIleUpload')
app.use('/api/v1/upload',upload)

// default route
app.get('/',(req,res)=>{
    res.send("<h1>Home</h1>")
})

app.listen(PORT,()=>{
    console.log("App Started on port: ",PORT)
})