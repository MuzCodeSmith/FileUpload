const File = require('../models/File');
const cloudinary = require('cloudinary').v2;

exports.localFileUpload = async (req,res)=>{
    try {
        const file = req.files.file;
        console.log("File aa gai ji!",file)

        let path = __dirname + "/files/"+ Date.now() + `.${file.name.split('.')[1]}`;
        
        file.mv(path,(err)=>{
            console.log(err)
        })

        res.status(200).json({
            success:true,
            message:'file uploaded successfully'
        })
    } catch (error) {
        res.status(500).json({
            success:false,
            error:error.message,
        }) 
    }
}

const isSupportedFormat = (type, supportedFormats) =>{
    return supportedFormats.includes(type)
}

async function uploadFileToCloudinary(file,folder){
    const options = {folder}
    return await cloudinary.uploader.upload(file.tempFilePath,options)
}

exports.imageUpload = async (req,res)=>{
    try {
        const {name, tags, email} = req.body;
        console.log(name, tags, email)

        const file = req.files.imageFile;
        console.log("file:",file);

        const supportedFormats = ['jpg','jpeg','png'];
        const fileType = file.name.split('.')[1].toLowerCase();
        console.log("fileType: ",fileType)
        if(!isSupportedFormat(fileType,supportedFormats)){
            console.log("entered into !isSupportedFormat")
            return res.status(500).json({
                success:false,
                message:"file format not supported!"
            }) 
        }

        const response = await uploadFileToCloudinary(file, 'muzzu')
        console.log("response:",response);

        res.json({
            success:true,
            message:"Image Uplaoded Successfully"
        })


    } catch (error) {
        res.status(522).json({
            success:false,
            error:error.message,
        }) 
    }
}