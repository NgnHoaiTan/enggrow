import { Controller, Get, Post, Delete, Put, Param, Body, Query, Req, Res, HttpStatus, UseGuards, Request, UnauthorizedException } from '@nestjs/common';
import { NotFoundException, BadRequestException, ParseIntPipe } from '@nestjs/common'
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { DeleteResult, UpdateResult } from 'typeorm';
import { createFolderDto } from './dtos/createFolder.dto';
import { updateFolderDto } from './dtos/updateFolder.dto';
import { FolderFlashcard } from './folder_flashcard.entity';
import { FolderFlashcardService } from './folder_flashcard.service';
import { UserService } from 'src/user/user.service';

@Controller('folder-flashcard')
export class FolderFlashcardController {
    constructor(
        private readonly folderService: FolderFlashcardService,
        private readonly userService: UserService
    ) { }

    @Get('all')
    async getAll() {
        return await this.folderService.getAll()
    }

    @UseGuards(JwtAuthGuard)
    @Get('all/user/:userId')
    async getAllByUser(@Request() req, @Res() response, @Param('userId', ParseIntPipe) userId: number) {
        try {
            const user = await this.userService.findUserById(req.user.userId)
            if (user) {
                const result = await this.folderService.getAllByUser(userId)
                return response.status(HttpStatus.OK).json(result)
            } else {
                throw new UnauthorizedException('Unauthorize')
            }

        } catch (error) {
            return response.status(error.status).json(error)
        }

    }

    @UseGuards(JwtAuthGuard)
    @Get('id/:id')
    async getById(@Request() req, @Res() response, @Param('id', ParseIntPipe) id: number, @Res() res): Promise<FolderFlashcard> {
        try {
            const user = await this.userService.findUserById(req.user.userId)
            if (user) {
                const folder = await this.folderService.getById(id)
                return response.status(HttpStatus.OK).json(folder)
            } else {
                throw new UnauthorizedException('Unauthorize')
            }

        } catch (error) {
            return response.status(error.status).json(error)
        }


    }
    @UseGuards(JwtAuthGuard)
    @Get('search')
    async searchByName(@Request() req, @Res() response, @Query('name') name: string): Promise<FolderFlashcard[]> {
        try {
            const user = await this.userService.findUserById(req.user.userId)
            if (user) {
                const folder = await this.folderService.searchByName(name)
                return response.status(HttpStatus.OK).json(folder)
            } else {
                throw new UnauthorizedException('Unauthorize')
            }

        } catch (error) {
            return response.status(error.status).json(error)
        }
    }

    @UseGuards(JwtAuthGuard)
    @Post('create')
    async createFolder(@Request() req, @Res() response, @Body() data: createFolderDto): Promise<FolderFlashcard> {
        try {
            const user = await this.userService.findUserById(req.user.userId)
            if (user) {
                const newFolder = await this.folderService.create(data)
                return response.status(HttpStatus.CREATED).json(newFolder)
            } else {
                throw new UnauthorizedException('Unauthorize')
            }


        } catch (error) {
            return response.status(error.status).json(error)
        }

    }

    @UseGuards(JwtAuthGuard)
    @Put('update/:id')
    async updateFolder(@Request() req, @Res() response, @Body() data: updateFolderDto, @Param('id', ParseIntPipe) id: number): Promise<UpdateResult> {
        try {
            console.log(req)
            const user = await this.userService.findUserById(req.user.userId)
            if (user) {
                const newFolder = await this.folderService.updateFolder(data, id)
                return response.status(HttpStatus.OK).json(newFolder)
            } else {
                throw new UnauthorizedException('Unauthorize')
            }

        } catch (error) {
            if(!error.status) {
                throw new Error(error)
            }
            return response.status(error.status).json(error)
        }
    }

    @UseGuards(JwtAuthGuard)
    @Delete('delete/:id')
    async deleteFolder(@Request() req, @Res() response, @Param('id', ParseIntPipe) id: number): Promise<DeleteResult> {
        try {
            const user = await this.userService.findUserById(req.user.userId)
            if (user) {
                const deleteResult = await this.folderService.deleteFolder(id)
            return response.status(HttpStatus.OK).json(deleteResult)
            } else {
                throw new UnauthorizedException('Unauthorize')
            }
            
        } catch (error) {
            return response.status(error.status).json(error)
        }
    }

    // @UseGuards(JwtAuthGuard)
    // @Get('duefolder')
    // async GetDueFolder(@Request() req, @Res() response) {
    //     try{
    //         const user = req.user
    //         const result = await this.folderService.GetDueFolder(user.userId)
    //         return response.status(HttpStatus.OK).json(result)
    //     }catch(error){
    //         console.log(error)
    //     }
    // }

    @UseGuards(JwtAuthGuard)
    @Get('practice/remind')
    async GetRemindPractice(@Request() req, @Res() response) {
        try{
            const user = req.user
            const result = await this.folderService.GetRemindPractice(user.userId)
            return response.status(HttpStatus.OK).json(result)
        }catch(error){
            if(!error.status) {
                throw new Error(error)
            }
            return response.status(error.status).json(error)
        }
    }
    @UseGuards(JwtAuthGuard)
    @Get('duefolder')
    async GetDueFolder(@Request() req, @Res() response) {
        try{
            const user = req.user
            const result = await this.folderService.GetDueFolder(user.userId)
            return response.status(HttpStatus.OK).json(result)
        }catch(error){
            if(!error.status) {
                throw new Error(error)
            }
            return response.status(error.status).json(error)
        }
    }


}
