const File = require('../models/File');
const cloudinary = require('cloudinary').v2;

exports.localFileUpload = async (req,res)=>{
    try {
        const file = req.files.file;

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

async function uploadFileToCloudinary(file,folder,quality){
    const options = {folder}
    options.resource_type ="auto";

    if(quality){
        options.quality = quality; 
    }
    return await cloudinary.uploader.upload(file.tempFilePath,options)
}

exports.imageUpload = async (req,res)=>{
    try {
        const {name, tags, email} = req.body;

        const file = req.files.imageFile;

        const supportedFormats = ['jpg','jpeg','png'];
        const fileType = file.name.split('.')[1].toLowerCase();

        if(!isSupportedFormat(fileType,supportedFormats)){
            return res.status(500).json({
                success:false,
                message:"file format not supported!"
            }) 
        }

        const response = await uploadFileToCloudinary(file, 'muzzu')

        const fileData = await File.create({
            name,
            email,
            tags,
            imageUrl:response.secure_url
        })

        res.json({
            success:true,
            imageUrl:response.secure_url,
            message:"Image Uplaoded Successfully"
        })


    } catch (error) {
        res.status(500).json({
            success:false,
            error:error.message,
        }) 
    }
}

exports.videoUpload = async (req,res) =>{
    try {

        const {email,name,tags} = req.body;
        const file = req.files.videoFile;


        const supportedFormats = ['mov','mp4'];
        const fileType = file.name.split('.')[1].toLowerCase();

        if(!isSupportedFormat(fileType,supportedFormats)){
            return res.status(400).json({
                success:false,
                message:"File format not supported"
            })
        }

        const response = await uploadFileToCloudinary(file, 'muzzu')


        const fileData = await File.create({
            tags,
            email,
            name,
            imageUrl:response.secure_url
        })

        res.json({
            success:true,
            imageUrl:response.secure_url,
            message:"Video Uplaoded Successfully"
        })
        
    }catch (error) {
            res.status(555).json({
                success:false,
                error:error.message,
        }) 
    }
}

exports.compressedImageUpload = async (req,res) =>{
    try {

        const {email,name,tags} = req.body;
        const file = req.files.imageFile;

        console.log("file: ",file)

        const supportedFormats = ['jpg','jpeg','png'];
        const fileType = file.name.split('.')[1].toLowerCase();
        console.log("fileType: ",fileType)

        if(!isSupportedFormat(fileType,supportedFormats)){
            return res.status(400).json({
                success:false,
                message:"File format not supported"
            })
        }

        const response = await uploadFileToCloudinary(file, 'muzzu',90)

        console.log("response:",response)

        const fileData = await File.create({
            tags,
            email,
            name,
            imageUrl:response.secure_url
        })

        res.json({
            success:true,
            imageUrl:response.secure_url,
            message:"Compressed Image Uplaoded Successfully"
        })
        
    }catch (error) {
            res.status(552).json({
                success:false,
                error:error.message,
        }) 
    }
}
