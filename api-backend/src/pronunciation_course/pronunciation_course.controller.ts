import { Body, Controller, Delete, Get, HttpStatus,BadRequestException, Param, ParseIntPipe, Post, Put, Query, Request, Res, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { createCourseDto } from './dtos/createCourse.dto';
import { updateCourseDto } from './dtos/updateCourse.dto';
import { PronunciationCourseService } from './pronunciation_course.service';
import { storageCloudinary } from '../cloudinary/cloudinary.config'
import { FileInterceptor } from '@nestjs/platform-express';
import { MemoryStore } from 'express-session';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
const { multerUploads, dataUri } = require("../parser_file/parser_file.config");
const cloudinary = require('cloudinary').v2;


cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_KEY,
    api_secret: process.env.CLOUDINARY_SECRET
});

@Controller('pronunciation-practice')
export class PronunciationCourseController {
    constructor(
        private readonly pronunCourseService: PronunciationCourseService
    ){}

    // @UseGuards(JwtAuthGuard)
    @Get('getall')
    async getAllCourses(@Request() req, @Res() response, @Query() query) { 
        try{
            const courses = await this.pronunCourseService.getAllCourse(query)
            return response.status(200).json(courses)
        }catch(error){
            if(!error.status){
                throw new Error(error)
            }
            return response.status(error.status).json(error)
        }
    }
    @Get('getnew')
    async getNewCourses(@Request() req, @Res() response) { 
        try{
            const courses = await this.pronunCourseService.getNewCourse()
            return response.status(200).json(courses)
        }catch(error){
            if(!error.status){
                throw new Error(error)
            }
            return response.status(error.status).json(error)
        }
    }
    @Get('getbyid/:id')
    async getCourseById(@Request() req, @Res() response, @Param('id', ParseIntPipe) id: number) { 
        try{
            const courses = await this.pronunCourseService.getCourseById(id)
            return response.status(200).json(courses)
        }catch(error){
            if(!error.status){
                throw new Error(error)
            }
            return response.status(error.status).json(error)
        }
    }
    @Post('')
    @UseInterceptors(FileInterceptor('file'))
    async createCourse(@Request() req, @Res() response, @Body() rawData:any, @UploadedFile() file: Express.Multer.File) { 
        try{
            let fileRes, resultUpload
            if(req.file) {
                fileRes = await dataUri(req).content;
                resultUpload = await cloudinary.uploader.upload(fileRes,{
                    folder:'engrow'
                })
                const data = {
                    name: rawData.name,
                    description: rawData.description,
                    level: rawData.level,
                    poster: resultUpload,
                    creatorId: rawData.creatorId
                }
                const course = await this.pronunCourseService.createCourse(data)
                return response.status(HttpStatus.CREATED).json(course)
            }
            else throw new BadRequestException('file is invalid')
            
        }catch(error){
            if(!error.status){
                throw new Error(error)
            }
            return response.status(error.status).json(error)
        }
    }
    @Put(':id')
    @UseInterceptors(FileInterceptor('file'))
    async updateCourse(@Request() req, @Res() response, @Body() rawData:any, @Param('id', ParseIntPipe) id: number, @UploadedFile() file: Express.Multer.File) { 
        try{
            let fileRes, resultUpload = null
            const oldCourse = await this.pronunCourseService.getCourseById(id)
            if(req.file) {
                fileRes = await dataUri(req).content;
                resultUpload = await cloudinary.uploader.upload(fileRes,{
                    folder:'engrow'
                })
                const oldPoster = oldCourse.poster_id
                if(oldPoster) {
                    const resultDestroy = await cloudinary.uploader.destroy(oldPoster)
                    console.log(resultDestroy)
                }
                   
            }
            const data = {
                name: rawData.name,
                description: rawData.description,
                level: rawData.level,
                poster: resultUpload,
            }
            const result = await this.pronunCourseService.updateCourse(data, id)
            return response.status(HttpStatus.OK).json(result)
            
        }catch(error){
            if(!error.status){
                throw new Error(error)
            }
            return response.status(error.status).json(error)
        }
    }
    @Delete(':id')
    async deleteCourse(@Request() req, @Res() response, @Param('id', ParseIntPipe) id: number) { 
        try{
            let oldCourse = await this.pronunCourseService.getCourseById(id)
            let oldPoster = oldCourse.poster_id  
            const result = await this.pronunCourseService.deleteCourse(id)
            let resultDestroy = await cloudinary.uploader.destroy(oldPoster)
            console.log(resultDestroy)
            return response.status(HttpStatus.ACCEPTED).json(result)
        }catch(error){
            if(!error.status){
                throw new Error(error)
            }
            return response.status(error.status).json(error)
        }
    }
}
