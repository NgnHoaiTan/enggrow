import { Controller, Get, Post, Delete, Put, Param, Body, Query, Req, Res, HttpStatus, UseGuards, Request, UnauthorizedException, UseInterceptors } from '@nestjs/common';
import { NotFoundException, BadRequestException, ParseIntPipe } from '@nestjs/common'
import { CardPronunciationResultService } from './card_pronunciation_result.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { FileInterceptor } from '@nestjs/platform-express';
const cloudinary = require('cloudinary').v2;
const { dataUri } = require("../parser_file/parser_file.config");

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_KEY,
    api_secret: process.env.CLOUDINARY_SECRET
});



@Controller('card-pronunciation-result')
export class CardPronunciationResultController {
    constructor(
        private readonly cardPronounceResultService: CardPronunciationResultService
    ) { }

    @UseGuards(JwtAuthGuard)
    @Get('getbyflashcard/:flashcardId')
    async getHistoryResultByFlashcard(@Request() req, @Res() response, @Param('flashcardId', ParseIntPipe) flashcardId: number) {
        try {
            const results = await this.cardPronounceResultService.getHistoryResultByFlashcard(flashcardId)
            return response.status(200).json(results)
        } catch (error) {
            if (!error.status) {
                throw new Error(error)
            }
            return response.status(error.status).json(error)
        }
    }

    @UseGuards(JwtAuthGuard)
    @Get('today')
    async getTodayHistoryResultOfUser(@Request() req, @Res() response) {
        try {
            const results = await this.cardPronounceResultService.getTodayHistoryResultOfUser(req.user.userId)
            return response.status(200).json(results)
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
    async saveHistoryResult(@Request() req, @Res() response, @Body() rawData: any) {
        let fileRes, resultUpload
        try {
            if (req.file) {
                fileRes = await dataUri(req).content;
                resultUpload = await cloudinary.uploader.upload(fileRes, {
                    folder: 'engrow',
                    resource_type: 'auto'
                })
                const data = {
                    score_gain: rawData.score_gain,
                    flashcardId: rawData.flashcardId,
                    pronounce: resultUpload,
                    user: rawData.userId
                }
                const result = await this.cardPronounceResultService.saveHistoryResult(data)
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
            return response.status(error.status).json(error)
        }
    }
    @Delete(':id')
    async deleteHistoryResult(@Request() req, @Res() response, @Param('id', ParseIntPipe) id: number) {
        try {
            let oldResult = await this.cardPronounceResultService.getHistoryResultById(id)
            let oldAudio = oldResult.pronounce_id
            const deleted = await this.cardPronounceResultService.deleteHistoryResult(id)
            await cloudinary.uploader.destroy(oldAudio, {invalidate: true, resource_type: "video"})
            return response.status(HttpStatus.OK).json(deleted)
        } catch (error) {
            if (!error.status) {
                throw new Error(error)
            }
            return response.status(error.status).json(error)
        }
    }
}
