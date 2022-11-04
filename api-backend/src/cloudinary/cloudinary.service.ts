import { Injectable } from '@nestjs/common';
import {storageCloudinary} from './cloudinary.config'
@Injectable()
export class CloudinaryService {
    constructor(
    ){}
    async upload(file: Express.Multer.File) {
        try{

        }catch(error){
            throw new Error(error)
        }
    }
}
