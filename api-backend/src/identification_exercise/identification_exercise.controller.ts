import { Body, Controller, Delete, Get, HttpStatus, Param, ParseIntPipe, Post, Put, Request, Res, UseGuards, UploadedFile, UseInterceptors, BadRequestException } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { updateExerciseDto } from './dtos/updateExercise.dto';
import { IdentificationExerciseService } from './identification_exercise.service';
import { FileInterceptor } from '@nestjs/platform-express';
const cloudinary = require('cloudinary').v2;
const { dataUri } = require("../parser_file/parser_file.config");

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_KEY,
    api_secret: process.env.CLOUDINARY_SECRET
});

@Controller('identification_exercise')
export class IdentificationExerciseController {
    constructor(
        private readonly identificationExerciseService: IdentificationExerciseService
    ) { }

    @UseGuards(JwtAuthGuard)
    @Get('getbyepisode/:episodeId')
    async getByEpisode(@Request() req, @Res() response, @Param('episodeId', ParseIntPipe) episodeId: number) {
        try {
            const exercises = await this.identificationExerciseService.getByEpisode(episodeId)
            return response.status(200).json(exercises)
        } catch (error) {
            if (!error.status) {
                throw new Error(error)
            }
            return response.status(error.status).json(error)
        }
    }

    @UseGuards(JwtAuthGuard)
    @Get(':id')
    async getById(@Request() req, @Res() response, @Param('id', ParseIntPipe) id: number) {
        try {
            const exercise = await this.identificationExerciseService.getExerciseById(id)
            return response.status(200).json(exercise)
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
    async createIdentificationExercise(@Request() req, @Res() response, @Body() rawData: any,
        @UploadedFile() file: Express.Multer.File
    ) {
        let fileRes, resultUpload
        try {
            
            if (req.file) {
                fileRes = await dataUri(req).content;
                resultUpload = await cloudinary.uploader.upload(fileRes, {
                    folder: 'engrow',
                    resource_type:'auto'
                })
                const data = {
                    true_word: rawData.true_word,
                    false_word: rawData.false_word,
                    episodeId: rawData.episodeId,
                    audio: resultUpload,
                }
                const result = await this.identificationExerciseService.createIdentificationExercise(data)
                return response.status(200).json(result)
            }
            else throw new BadRequestException('file is invalid')

        } catch (error) {
            if(resultUpload) {
                await cloudinary.uploader.destroy(resultUpload.public_id, {invalidate: true, resource_type: "video"})
            }
            if (!error.status) {
                throw new Error(error)
            }
            else if(error.http_code) {
                return response.status(error.http_code).json(error)
            }
            return response.status(error.status).json(error)
        }
    }

    @UseGuards(JwtAuthGuard)
    @Put(':id')
    @UseInterceptors(FileInterceptor('audio'))
    async updateIdentificationExercise(@Request() req, @Res() response, @Body() rawData: any, @Param('id', ParseIntPipe) id: number,
        @UploadedFile() audio: Express.Multer.File
    ) {
        try {
            let fileRes, resultUpload
            let oldExercise = await this.identificationExerciseService.getExerciseById(id)
            let oldAudio = oldExercise.audio_id
            if (req.file) {
                fileRes = await dataUri(req).content;
                resultUpload = await cloudinary.uploader.upload(fileRes, {
                    folder: 'engrow/exercise'
                })

            }
            const data = {
                true_word: rawData.true_word,
                false_word: rawData.false_word,
                audio: resultUpload,
            }
            const result = await this.identificationExerciseService.updateIdentificationExercise(data, id)
            if(resultUpload && result) {
                await cloudinary.uploader.destroy(oldAudio)
            }
            return response.status(200).json(result)

        } catch (error) {
            if (!error.status) {
                throw new Error(error)
            }
            return response.status(error.status).json(error)
        }
    }

    @UseGuards(JwtAuthGuard)
    @Delete(':id')
    async deleteIdentificationExercise(@Request() req, @Res() response, @Param('id', ParseIntPipe) id: number) {
        try {
            let oldExercise = await this.identificationExerciseService.getExerciseById(id)
            let oldAudio = oldExercise.audio_id
            const result = await this.identificationExerciseService.deleteIdentificationExercise(id)
            await cloudinary.uploader.destroy(oldAudio, {invalidate: true, resource_type: "video"})
            return response.status(HttpStatus.OK).json(result)
        } catch (error) {
            if (!error.status) {
                throw new Error(error)
            }
            return response.status(error.status).json(error)
        }
    }
}
