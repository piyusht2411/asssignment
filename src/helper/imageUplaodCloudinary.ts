import { v2 as cloudinary } from 'cloudinary';
import { Request, Response } from 'express';
import { CloudinaryStorage } from 'multer-storage-cloudinary';


cloudinary.config({ 
    cloud_name: 'dfklkapwz', 
    api_key: '599688276986113', 
    api_secret: 'k6FN7tGfjUl77ynGEhFVSEaveTo',
    secure: true
  });

  let uploadImage = async (req:Request, res:Response) => {

    try {

      // Upload the image
      if(req.file){
        const result = await cloudinary.uploader.upload(req.file.path);
      console.log(result);
      res.json({url:result.secure_url});
      }
      else{
        res.status(400).json({message:"No file provided"});
      }
      
    } catch (error) {
        res.status(400).json({message:"Image uploading failed"});
      
    }
};
export {uploadImage};
