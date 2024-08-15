const cloudinary = require('cloudinary').v2;

module.exports.UploadImage = async(fileStream,fileName)=>{
    cloudinary.config({ 
        cloud_name: process.env.CLOUD_NAME, 
        api_key: process.env.API_KEY, 
        api_secret: process.env.API_SECRET // Click 'View Credentials' below to copy your API secret
    
    });

    const uploadResult = await cloudinary
                            .uploader
                            .upload(fileStream,
                                {public_id:fileName},
                                function(res){})
                                .catch((error)=>{
                                    console.log("hata olustu-upload middleware",error)
                                });

     const optimizeUrl = cloudinary.url(fileName, {
                            fetch_format: 'auto',
                            quality: 'auto'
                                });
    const url = cloudinary.url(fileName,{
        crop:'auto',
        gravity:'auto',
        width:500,
        height:500
    })
    
    return optimizeUrl;
};