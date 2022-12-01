import { Controller, UseGuards, Post, Body, Get, Req, Res, HttpStatus } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport'
import { Request, response } from 'express';
import { CreateUserDto } from 'src/user/dtos/CreateUser.dto';
import { AuthService } from './auth.service';
import { GoogleAuthGuard } from './google.guard';
import { LocalAuthGuard } from './local-auth.guard';

@Controller('auth')
export class AuthController {
    constructor(
        private readonly authService: AuthService
    ) { }




    @Get('google/login')
    @UseGuards(GoogleAuthGuard)
    async loginGoole(@Req() req) {
        return {
            user: req.user.user,
            accessToken: req.user.accessToken
        }
    }

    @Get('status')
    async loginGoogleStatus(@Req() request: any) {
        if (request.user) {
            return { user: request.user, msg: 'Authenticated' }
        }
        else return { msg: 'Unauthencated' }
    }

    @Get('google/redirect')
    @UseGuards(GoogleAuthGuard)
    async redirectGoogle(@Req() request: any) {
        return { msg: 'Redirect google', accessToken: request.user.accessToken }
    }

    // original

    @UseGuards(LocalAuthGuard)
    @Post('login')
    async login(@Req() req, @Res() response) {
        const data = await this.authService.login(req.user)
        return response.status(HttpStatus.OK).json(data)

    }
    
    @UseGuards(LocalAuthGuard)
    @Post('admin/login')
    async loginByAdmin(@Req() req, @Res() response) {
        const data = await this.authService.login(req.user)
        return response.status(HttpStatus.OK).json(data)

    }

    @Post('signup')
    async signup(@Res() response, @Body() data: CreateUserDto) {
        try {
            const newuser = await this.authService.signup(data)
            return response.status(HttpStatus.CREATED).json(newuser)
        } catch (error) {
            return response.status(400).json(error.response)
        }
    }
}
