import { Controller, Post, Request, Res, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { CloudinaryService } from './cloudinary.service';
import uploadCloud from './cloudinary.config'
import { storageCloudinary } from './cloudinary.config'
const cloudinary = require('cloudinary').v2;

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_KEY,
    api_secret: process.env.CLOUDINARY_SECRET
});

@Controller('cloudinary')
export class CloudinaryController {
    constructor(
        private readonly cloudinaryService: CloudinaryService
    ) { }
    @Post('/upload')
    @UseInterceptors(FileInterceptor('file', {
        storage: storageCloudinary
    }))
    async uploadFile(@Request() req, @Res() response, @UploadedFile() file: Express.Multer.File) {
        try {
            console.log(123)
            return response.json(req.file);
        } catch (error) {
            if(req.file) {
                await cloudinary.uploader.destroy(req.file.filename, function (error, result) {
                    console.log(result, error)
                })
            }
            
            if (!error.status) {
                throw new Error(error)
            }
            return response.status(error.status).json(error)
        }
    }
}
