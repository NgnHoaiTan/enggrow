import { BadRequestException, Body, Controller, Delete, Get, HttpStatus, Param, ParseIntPipe, Post, Put, Query, Request, Res, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { UserService } from 'src/user/user.service';
import { StaffProfileService } from './staff_profile.service';

const { dataUri } = require("../parser_file/parser_file.config");
const cloudinary = require('cloudinary').v2;
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_KEY,
    api_secret: process.env.CLOUDINARY_SECRET
});


@Controller('staff-profile')
export class StaffProfileController {
    constructor(
        private readonly profileService: StaffProfileService,
        private readonly userService: UserService
    ) { }

    @UseGuards(JwtAuthGuard)
    @Get(':id')
    async getProfileById(@Request() req, @Res() response, @Param('id', ParseIntPipe) id: number) {
        try {
            const profile = await this.profileService.getProfileById(id)
            return response.status(200).json(profile)
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
    async createProfile(@Request() req, @Res() response, @Body() data: any) {
        let fileRes, resultUpload
        try {
            if (req.file) {
                fileRes = await dataUri(req).content;
                resultUpload = await cloudinary.uploader.upload(fileRes, {
                    folder: 'engrow',
                    resource_type: 'auto'
                })
                const userId = req.user.userId
                const dataProfile = {
                    certification: resultUpload,
                    introduction: data.introduction
                }
                const profile = await this.profileService.createProfile(dataProfile)
                // save profile to user
                await this.userService.saveProfileToUser(profile, userId)
                return response.status(200).json(profile)
            }
            else throw new BadRequestException('file is invalid')
        } catch (error) {
            if (resultUpload) {
                await cloudinary.uploader.destroy(resultUpload.public_id, { invalidate: true, resource_type: "video" })
            }
            if (!error.status) {
                throw new Error(error)
            }
            return response.status(error.status).json(error)
        }
    }

    @UseGuards(JwtAuthGuard)
    @Put(':id')
    @UseInterceptors(FileInterceptor('file'))
    async updateProfile(@Request() req, @Res() response, @Body() data: any, @Param('id', ParseIntPipe) id: number) {
        let fileRes, resultUpload
        try {
            if (req.file) {
                fileRes = await dataUri(req).content;
                resultUpload = await cloudinary.uploader.upload(fileRes, {
                    folder: 'engrow',
                    resource_type: 'auto'
                })
            }

            const dataProfile = {
                certification: resultUpload,
                introduction: data.introduction
            }
            const profile = await this.profileService.updateProfile(dataProfile,id)
            return response.status(200).json(profile)
        } catch (error) {
            if (resultUpload) {
                await cloudinary.uploader.destroy(resultUpload.public_id, { invalidate: true, resource_type: "video" })
            }
            if (!error.status) {
                throw new Error(error)
            }
            return response.status(error.status).json(error)
        }
    }
}
