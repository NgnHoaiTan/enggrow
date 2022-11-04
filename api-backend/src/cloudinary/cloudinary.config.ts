const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const multer = require('multer');

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_KEY,
  api_secret: process.env.CLOUDINARY_SECRET
});

export const storageCloudinary = new CloudinaryStorage({
  cloudinary,
  params:{
    folder:'engrow',
    overwrite:true,
    resource_type: "auto",
    public_id: (req, file) => console.log(file.originalname),
  },
  // allowedFormats: ['jpg', 'png','mp4','webm'],
  filename: function (req, file, cb) {
    cb(null, file.originalname); 
  }
});



const uploadCloud = multer({ storageCloudinary });

export default uploadCloud