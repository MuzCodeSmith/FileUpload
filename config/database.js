const mongoose = require('mongoose');
require('dotenv').config()

exports.connectDB = async () =>{
    mongoose.connect(process.env.MONGODB_URL)
    .then(()=>console.log("database connected successfully"))
    .catch((error)=>{
        console.log("failed to connect database")
        console.error(error);
        process.exit(1)
    })
}