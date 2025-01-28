const File = require('../models/File');

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
        
    }
}