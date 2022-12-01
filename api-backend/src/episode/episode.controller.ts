import { BadRequestException, Body, Controller, Delete, Get, HttpStatus, Param, ParseIntPipe, Post, Put, Query, Request, Res, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { query } from 'express';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { createEpisodeDto } from './dtos/createEpisode.dto';
import { updateEpisodeDto } from './dtos/updateEpisode.dto';
import { EpisodeService } from './episode.service';
import { storageCloudinary } from '../cloudinary/cloudinary.config'

const { dataUri } = require("../parser_file/parser_file.config");
const cloudinary = require('cloudinary').v2;


cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_KEY,
    api_secret: process.env.CLOUDINARY_SECRET
});


@Controller('episode')
export class EpisodeController {
    constructor(
        private readonly episodeService: EpisodeService
    ) { }

    @Get('getbycourse/:courseId')
    async getEpisodesByCourse(@Request() req, @Res() response, @Query() query, @Param('courseId', ParseIntPipe) courseId: number) {
        try {
            const episodes = await this.episodeService.getByCourse(courseId, query)
            return response.status(200).json(episodes)
        } catch (error) {
            if (!error.status) {
                throw new Error(error)
            }
            return response.status(error.status).json(error)
        }
    }

    @Get(':id')
    async getEpisodeById(@Request() req, @Res() response, @Param('id', ParseIntPipe) id: number) {
        try {
            const episodes = await this.episodeService.getEpisodeById(id)
            return response.status(200).json(episodes)
        } catch (error) {
            if (!error.status) {
                throw new Error(error)
            }
            return response.status(error.status).json(error)
        }
    }
    @Post('')
    @UseInterceptors(FileInterceptor('file'))
    async createEpisode(@Request() req, @Res() response, @Body() rawData: any, @UploadedFile() file: Express.Multer.File) {
        let fileRes, resultUpload
        try {
            if(req.file) {
                fileRes = await dataUri(req).content;
                resultUpload = await cloudinary.uploader.upload(fileRes,{
                    folder:'engrow',
                    resource_type:'auto'
                })
                const data = {
                    name: rawData.name,
                    description: rawData.description,
                    fundamentals: rawData.fundamentals,
                    courseId: rawData.courseId,
                    video: resultUpload
                }
                const result = await this.episodeService.createEpisode(data)
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

    @Put(':id')
    @UseInterceptors(FileInterceptor('file'))
    async updateEpisode(@Request() req, @Res() response, @Body() rawData: any, @UploadedFile() file: Express.Multer.File, @Param('id', ParseIntPipe) id: number) {
        let fileRes, resultUpload
        try {
            if(req.file) {
                fileRes = await dataUri(req).content;
                resultUpload = await cloudinary.uploader.upload(fileRes,{
                    folder:'engrow',
                    resource_type:'auto'
                })  
            }
            const data = {
                name: rawData.name,
                description: rawData.description,
                fundamentals: rawData.fundamentals,
                video: resultUpload
            }
            const result = await this.episodeService.updateEpisode(data, id)
            return response.status(200).json(result)
        } catch (error) {

            if (!error.status) {
                throw new Error(error)
            }
            return response.status(error.status).json(error)
        }
    }
    @Delete(':id')
    async deleteEpisode(@Request() req, @Res() response, @Param('id', ParseIntPipe) id: number) {
        try {
            const episode = await this.episodeService.getEpisodeById(id)
            let public_id = episode.video_id
            const result = await this.episodeService.deleteEpisode(id)

            if(public_id) {
                await cloudinary.uploader.destroy(public_id,{invalidate: true, resource_type: "video"} ,function (error, result) {
                    console.log(result, error)
                })
            }
            return response.status(200).json(result)
        } catch (error) {
            if (!error.status) {
                throw new Error(error)
            }
            return response.status(error.status).json(error)
        }
    }
}
