import {  Body, Controller, Delete, Get, HttpStatus, BadRequestException, Param, ParseIntPipe, Post, Put, Query, Request, Res, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { UserService } from './user.service';


@Controller('user')
export class UserController {
    constructor(
        private readonly userService: UserService
    ){}

    // @UseGuards(JwtAuthGuard)
    // @Get('profile')
    // getProfile(@Request() req, @Body() data:any) {
    //     console.log(data)
    //     return req.user;
    // }

    @Get('all')
    findAll() {
        return this.userService.findAll()
    }
    @UseGuards(JwtAuthGuard)
    @Get('profile') 
    async getUserProfile(@Request() req, @Res() response){
        try {
            const user = await this.userService.getInfomationOfUser(req.user.userId)
            return response.status(200).json(user)
        } catch (error) {
            if (!error.status) {
                throw new Error(error)
            }
            return response.status(error.status).json(error)
        }
    }

    @UseGuards(JwtAuthGuard)
    @Get('staff/profile') 
    async getStaffProfile(@Request() req, @Res() response){
        try {
            const staff = await this.userService.getMyStaffProfile(req.user.userId)
            return response.status(200).json(staff)
        } catch (error) {
            if (!error.status) {
                throw new Error(error)
            }
            return response.status(error.status).json(error)
        }
    }

    @UseGuards(JwtAuthGuard)
    @Put(':id') 
    async updateBaseProfile(@Request() req, @Res() response, @Param('id', ParseIntPipe) id: number, @Body() rawData: any){
        try {
            let existEmail = await this.userService.findByEmail(rawData.email)
            let existPhone = await this.userService.findUserByPhone(rawData.phone_number)
            if(existEmail && existEmail.id !== id) {
                throw new BadRequestException('Email đã được sử dụng')
            }
            if(existPhone && existPhone.id !== id) {
                throw new BadRequestException('Số điện thoại đã được người dùng khác sử dụng')
            }
            let data = {
                name: rawData.name,
                address: rawData.address,
                email: rawData.email,
                phone_number: rawData.phone_number,
                dob: rawData.dob
            }
            const staff = await this.userService.updateInformation(data, id)
            return response.status(200).json(staff)
        } catch (error) {
            if (!error.status) {
                throw new Error(error)
            }
            return response.status(error.status).json(error)
        }
    }
    
}
