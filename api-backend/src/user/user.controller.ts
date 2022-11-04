import { Controller, Get, Request, Post, UseGuards, Body } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { UserService } from './user.service';


@Controller('user')
export class UserController {
    constructor(
        private readonly userService: UserService
    ){}

    @UseGuards(JwtAuthGuard)
    @Get('profile')
    getProfile(@Request() req, @Body() data:any) {
        console.log(data)
        return req.user;
    }

    @Get('all')
    findAll() {
        return this.userService.findAll()
    }
}
