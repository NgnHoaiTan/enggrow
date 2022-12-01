import { BadRequestException, Body, Controller, Delete, Get, HttpStatus, Param, ParseIntPipe, Post, Put, Query, Request, Res, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { UserService } from 'src/user/user.service';
import { AvatarService } from './avatar.service';


const { dataUri } = require("../parser_file/parser_file.config");
const cloudinary = require('cloudinary').v2;


cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_KEY,
    api_secret: process.env.CLOUDINARY_SECRET
});
@Controller('avatar')
export class AvatarController {
    constructor(
        private readonly avatarService: AvatarService,
        private readonly userService: UserService
    ){}

    @UseGuards(JwtAuthGuard)
    @Get('my-avatars')
    async getMyAvatars(@Request() req, @Res() response) {
        try {
            const avatars = await this.avatarService.getAlbumsAvatarOfUser(req.user.userId)
            return response.status(200).json(avatars)
        }catch(error) {
            if (!error.status) {
                throw new Error(error)
            }
            return response.status(error.status).json(error)
        }
    }

    @UseGuards(JwtAuthGuard)
    @Post('upload-avatar')
    @UseInterceptors(FileInterceptor('file'))
    async uploadNewAvatar(@Request() req, @Res() response){
        let fileRes, resultUpload
        try {
            if (req.file) {
                fileRes = await dataUri(req).content;
                resultUpload = await cloudinary.uploader.upload(fileRes, {
                    folder: 'engrow',
                    resource_type: 'auto'
                })
                let userId = req.user.userId
                const avatar = await this.avatarService.uploadNewAvatar(resultUpload, userId)
                await this.userService.updateCurrentAvatar(avatar.image_url, userId)
                return response.status(200).json(avatar)
            }
            else throw new BadRequestException('file is invalid')
        }catch(error) {
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
    @Put('change-avatar')
    async changeAvatar(@Request() req, @Res() response, @Body() data: any){
        try {
            let userId = req.user.userId
            let avatar = await this.avatarService.getAvatarById(data.avatarId)
            const result = await this.userService.updateCurrentAvatar(avatar.image_url, userId)
            return response.status(200).json(result)
        }catch(error) {
            if (!error.status) {
                throw new Error(error)
            }
            return response.status(error.status).json(error)
        }
    }

    @UseGuards(JwtAuthGuard)
    @Delete(':id')
    async deleteAvatar(@Request() req, @Res() response,@Param('id', ParseIntPipe) id: number){
        try {
            let defaultAvatar = 'https://res.cloudinary.com/hoaitan/image/upload/v1668854027/engrow/no_avatar_gd2rni.jpg'
            let avatar = await this.avatarService.getAvatarById(id)
            let user = await this.userService.findUserById(req.user.userId)
            let avatar_url = avatar.image_url
            let avatar_id = avatar.image_id
            const deleteAvatar = await this.avatarService.deleteAvatar(id)
            if(user.current_avatar == avatar_url) {
                await this.userService.updateCurrentAvatar(defaultAvatar, user.id)
            }
            await cloudinary.uploader.destroy(avatar_id)
            return response.status(200).json(deleteAvatar)
        }catch(error) {
            if (!error.status) {
                throw new Error(error)
            }
            return response.status(error.status).json(error)
        }
    }

}
