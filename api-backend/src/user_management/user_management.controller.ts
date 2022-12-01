import { Controller, Get, Post, Delete, Query, Request, Res, Body, UseGuards, Param, ParseIntPipe } from '@nestjs/common';
import { UserManagementService } from './user_management.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller('user-management')
export class UserManagementController {
    constructor(
        private readonly userManagementService: UserManagementService
    ){}

    @Get('list-users')
    async getListUser(@Request() req, @Res() response, @Query() query) {
        try{
            const result = await this.userManagementService.getListUsers(query)
            return response.status(200).json(result)
        }catch(error){
            if(!error.status){
                throw new Error(error)
            }
            return response.status(error.status).json(error)
        }
    }
    @Get('search')
    async searchPaginationUser(@Request() req, @Res() response, @Query() query) {
        try{
            const result = await this.userManagementService.searchUsers(query)
            return response.status(200).json(result)
        }catch(error){
            if(!error.status){
                throw new Error(error)
            }
            return response.status(error.status).json(error)
        }
    }
    @Get('get-profile/:userId')
    async getUserById(@Request() req, @Res() response, @Param('userId',ParseIntPipe) userId: number) {
        try{
            const result = await this.userManagementService.getDetailUserById(userId)
            return response.status(200).json(result)
        }catch(error){
            if(!error.status){
                throw new Error(error)
            }
            return response.status(error.status).json(error)
        }
    }
}
