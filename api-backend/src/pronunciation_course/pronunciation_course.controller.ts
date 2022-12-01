import { Body, Controller, Delete, Get, HttpStatus,BadRequestException, Param, ParseIntPipe, Post, Put, Query, Request, Res, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { PronunciationCourseService } from './pronunciation_course.service';
import { FileInterceptor } from '@nestjs/platform-express';

const { dataUri } = require("../parser_file/parser_file.config");
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

    @UseGuards(JwtAuthGuard)
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
    @UseGuards(JwtAuthGuard)
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
    @UseGuards(JwtAuthGuard)
    @Get('review/creator/:creatorId')
    async getReviewCoursesByCreator(@Request() req, @Res() response, @Param('creatorId', ParseIntPipe) creatorId: number ) {
        try{
            const courses = await this.pronunCourseService.getReviewCoursesByCreator(creatorId)
            return response.status(200).json(courses)
        }catch(error){
            if(!error.status){
                throw new Error(error)
            }
            return response.status(error.status).json(error)
        }
    }
    @UseGuards(JwtAuthGuard)
    @Get('mycourse')
    async getMyCourses(@Request() req, @Res() response, @Query() query) {
        try{
            const creatorId = req.user.userId
            const courses = await this.pronunCourseService.getMyCourses(creatorId, query)
            return response.status(200).json(courses)
        }catch(error){
            if(!error.status){
                throw new Error(error)
            }
            return response.status(error.status).json(error)
        }
    }

    @UseGuards(JwtAuthGuard)
    @Get('top-interested')
    async getTopCoursesHaveMostMember(@Request() req, @Res() response){
        try{
            const courses = await this.pronunCourseService.getTopCoursesHaveMostMember()
            return response.status(200).json(courses)
        }catch(error){
            if(!error.status){
                throw new Error(error)
            }
            return response.status(error.status).json(error)
        }
    }

    @UseGuards(JwtAuthGuard)
    @Get('less-interested')
    async getTopCoursesHaveFewestMember(@Request() req, @Res() response){
        try{
            const courses = await this.pronunCourseService.getTopCoursesHaveFewestMember()
            return response.status(200).json(courses)
        }catch(error){
            if(!error.status){
                throw new Error(error)
            }
            return response.status(error.status).json(error)
        }
    }
    
    @UseGuards(JwtAuthGuard)
    @Get('trending/level')
    async statisticLevelTrending(@Request() req, @Res() response) {
        try{
            const results = await this.pronunCourseService.statisticLevelTrending()
            return response.status(200).json(results)
        }catch(error){
            if(!error.status){
                throw new Error(error)
            }
            return response.status(error.status).json(error)
        }
    }

    @UseGuards(JwtAuthGuard)
    @Get('getall/creator/:creatorId')
    async getAllCoursesByCreator(@Request() req, @Res() response, @Param('creatorId', ParseIntPipe) creatorId: number ) {
        try{
            const courses = await this.pronunCourseService.getAllCoursesByCreator(creatorId)
            return response.status(200).json(courses)
        }catch(error){
            if(!error.status){
                throw new Error(error)
            }
            return response.status(error.status).json(error)
        }
    }

    @UseGuards(JwtAuthGuard)
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
    @UseGuards(JwtAuthGuard)
    @Post('')
    @UseInterceptors(FileInterceptor('file'))
    async createCourse(@Request() req, @Res() response, @Body() rawData:any, @UploadedFile() file: Express.Multer.File) { 
        try{
            let fileRes, resultUpload
            if(req.file) {
                fileRes = await dataUri(req).content;
                resultUpload = await cloudinary.uploader.upload(fileRes,{
                    folder:'engrow',
                    resource_type:'auto'
                })
                const data = {
                    name: rawData.name,
                    description: rawData.description,
                    level: rawData.level,
                    poster: resultUpload,
                    creatorId: req.user.userId
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
    @UseGuards(JwtAuthGuard)
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
    @UseGuards(JwtAuthGuard)
    @Delete(':id')
    async deleteCourse(@Request() req, @Res() response, @Param('id', ParseIntPipe) id: number) { 
        try{
            let oldCourse = await this.pronunCourseService.getCourseById(id)
            let oldPoster = oldCourse.poster_id  
            const result = await this.pronunCourseService.deleteCourse(id)
            let resultDestroy = await cloudinary.uploader.destroy(oldPoster)
            return response.status(HttpStatus.OK).json(result)
        }catch(error){
            if(!error.status){
                throw new Error(error)
            }
            return response.status(error.status).json(error)
        }
    }
}
