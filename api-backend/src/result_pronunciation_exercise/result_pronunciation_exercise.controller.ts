import { UserService } from '../user/user.service';
import { ResultPronunciationExerciseService } from './result_pronunciation_exercise.service';
import {  Body, Controller, Delete, Get, HttpStatus, BadRequestException, Param, ParseIntPipe, Post, Put, Query, Request, Res, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { FileInterceptor } from '@nestjs/platform-express';
import { WordAssessmentService } from 'src/word_assessment/word_assessment.service';
import { PhoneAssessmentService } from 'src/phone_assessment/phone_assessment.service';
import { DeleteResult } from 'typeorm';
const { dataUri } = require("../parser_file/parser_file.config");
const cloudinary = require('cloudinary').v2;


cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_KEY,
    api_secret: process.env.CLOUDINARY_SECRET
});

@Controller('result-pronunciation-exercise')
export class ResultPronunciationExerciseController {
    constructor(
        private readonly resultService: ResultPronunciationExerciseService,
        private readonly userService: UserService,
        private readonly wordAssessmentService: WordAssessmentService,
        private readonly phoneAssessmentService: PhoneAssessmentService
    ) { }

    @Get(':id')
    async getById(@Request() req, @Res() response, @Param('id', ParseIntPipe) id: number) {
        try {
            const result = await this.resultService.getResultById(id)
            return response.status(200).json(result)
        } catch (error) {
            if (!error.status) {
                throw new Error(error)
            }
            return response.status(error.status).json(error)
        }
    }
    @UseGuards(JwtAuthGuard)
    @Get('getall/byexercise/:exerciseId')
    async getByUserAndExercise(@Request() req, @Res() response, @Param('exerciseId', ParseIntPipe) exerciseId: number) {
        try {
            const userId = req.user.userId
            const results = await this.resultService.getAllResultByUserAndExercise(userId, exerciseId)
            return response.status(200).json(results)
        } catch (error) {
            if (!error.status) {
                throw new Error(error)
            }
            return response.status(error.status).json(error)
        }
    }
    @UseGuards(JwtAuthGuard)
    @Get('getnewest/byexercise/:exerciseId')
    async getNewestResultByUserAndExercise(@Request() req, @Res() response, @Param('exerciseId', ParseIntPipe) exerciseId: number) {
        try {
            const userId = req.user.userId
            const result = await this.resultService.getNewestResultByUserAndExercise(userId, exerciseId)
            return response.status(200).json(result)
        } catch (error) {
            if (!error.status) {
                throw new Error(error)
            }
            return response.status(error.status).json(error)
        }
    }
    @UseGuards(JwtAuthGuard)
    @Post('')
    @UseInterceptors(FileInterceptor('file'))
    async createResult(@Request() req, @Res() response, @Body() rawData: any, @UploadedFile() file: Express.Multer.File) {
        try {
            let fileRes, resultUpload
            if (req.file) {
                fileRes = await dataUri(req).content;
                resultUpload = await cloudinary.uploader.upload(fileRes, {
                    folder: 'engrow',
                    resource_type: 'auto'
                })
                const userId = req.user.userId
                const data = {
                    exerciseId: rawData.exerciseId,
                    userId: userId,
                    score_gain: rawData.score_gain,
                    pronounce_file: resultUpload
                }
                const result = await this.resultService.createResult(data)
                for await (const word_assessment of rawData.word_assessments) {
                    const wordAssessmentData = {
                        label: word_assessment.word,
                        score: word_assessment.score,
                        result_pronunciation_id: result.id
                    }
                    let word = await this.wordAssessmentService.createWordAssessment(wordAssessmentData)
                    for await (const phone_assessment of word_assessment.phones) {
                        let phoneAssessmentData = {
                            label_ipa: phone_assessment.label_ipa,
                            score: phone_assessment.score,
                            word_assessment_id: word.id
                        }
                        await this.phoneAssessmentService.createAssessment(phoneAssessmentData)
                    }
                
                }
                
                return response.status(200).json(result)
            }
            else throw new BadRequestException('file is invalid')

        } catch (error) {
            if (!error.status) {
                throw new Error(error)
            }
            return response.status(error.status).json(error)
        }
    }
    @UseGuards(JwtAuthGuard)
    @Delete(':id')
    async DeleteResult(@Res() response, @Param('id', ParseIntPipe) id: number){
        try{
            let oldResult = await this.resultService.getResultById(id)
            const cloud_file_id = oldResult.pronounce_id
            const resultDelete = await this.resultService.DeleteResult(id)
            let deleteCloud = await cloudinary.uploader.destroy(cloud_file_id,{invalidate: true, resource_type: "video"})
            return response.status(HttpStatus.OK).json(resultDelete)
        }catch(error){
            console.log(error)
            if (!error.status) {
                throw new Error(error)
            }
            
            return response.status(error.status).json(error)
        }
    }

}
