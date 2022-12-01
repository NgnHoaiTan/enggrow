import { Controller, Get, Post, Delete, Put, Param, Body, Query, Req, Res, HttpStatus, UseGuards, Request, UnauthorizedException } from '@nestjs/common';
import { NotFoundException, BadRequestException, ParseIntPipe } from '@nestjs/common'
import { DeleteResult, UpdateResult } from 'typeorm';
import { createCardDto } from './dtos/createCard.dto';
import { updateCardDto } from './dtos/updateCard.dto';
import { Flashcard } from './flashcard.entity';
import { FlashcardService } from './flashcard.service';
import { Express } from 'express'
import { UseInterceptors, UploadedFile } from '@nestjs/common'
import { FileInterceptor } from '@nestjs/platform-express'
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { UserService } from 'src/user/user.service';
import { FolderFlashcardService } from 'src/folder_flashcard/folder_flashcard.service';
import { supermemo, SuperMemoItem, SuperMemoGrade } from 'supermemo'
import dayjs from 'dayjs'

@Controller('flashcard')
export class FlashcardController {
    constructor(
        private readonly flashcardService: FlashcardService,
        private readonly userService: UserService,
        private readonly folderService: FolderFlashcardService
    ) { }

    @UseGuards(JwtAuthGuard)
    @Get('folder/:folderId')
    async getAll(@Request() req, @Res() res, @Param('folderId', ParseIntPipe) folderId: number): Promise<Flashcard[]> {
        try {
            const user = await this.userService.findUserById(req.user.userId)
            const folder = await this.folderService.getById(folderId)
            if (user) {
                if(user.id === folder.user.id) {
                    const cards = await this.flashcardService.getAll(folderId)
                    return res.status(200).json(cards)
                }else{
                    throw new UnauthorizedException('Unauthorize')
                }
                
            } else {
                throw new UnauthorizedException('User is not valid')
            }
        }catch(error){
            if (!error.status) {
                throw new Error(error)
            }
            return res.status(error.status).json(error)
        }
        
    }
    @UseGuards(JwtAuthGuard)
    @Get('id/:id')
    async getById(@Request() req, @Param('id', ParseIntPipe) id: number): Promise<Flashcard> {
        const card = await this.flashcardService.getById(id)
        if (card) {
            return card
        }
        throw new NotFoundException('Flashcard is not invalid')
    }

    @UseGuards(JwtAuthGuard)
    @Post('create')
    async createCard(@Request() req, @Res() response, @Body() data: createCardDto): Promise<Flashcard> {
        try {
            const user = await this.userService.findUserById(req.user.userId)
            if (user) {
                const newCard = await this.flashcardService.createCard(data)
                return response.status(HttpStatus.CREATED).json(newCard)
            } else {
                throw new UnauthorizedException('User is not valid')
            }


        } catch (error) {
            if (!error.status) {
                throw new Error(error)
            }
            return response.status(error.status).json(error)
        }

    }

    @UseGuards(JwtAuthGuard)
    @Put('update/:id')
    async updateCard(@Request() req, @Res() response, @Body() data: updateCardDto, @Param('id', ParseIntPipe) id: number): Promise<UpdateResult> {
        try {
            const user = await this.userService.findUserById(req.user.userId)
            if (user) {
                const updated = await this.flashcardService.updateCard(data, id)
                return response.status(HttpStatus.OK).json(updated)
            } else {
                throw new UnauthorizedException('User is not valid')
            }

        } catch (error) {
            if (!error.status) {
                throw new Error(error)
            }
            return response.status(error.status).json(error)
        }

    }

    @UseGuards(JwtAuthGuard)
    @Delete('delete/:id')
    async deleteCard(@Request() req, @Res() response, @Param('id', ParseIntPipe) id: number): Promise<DeleteResult> {
        try {
            const deleted = await this.flashcardService.deleteCard(id)
            return response.status(HttpStatus.OK).json(deleted)
        } catch (error) {
            if (!error.status) {
                throw new Error(error)
            }
            return response.status(error.status).json(error)
        }
    }

    @Post('upload/file')
    @UseInterceptors(FileInterceptor('file'))
    uploadFile(@UploadedFile() file: Express.Multer.File) {
        console.log(file);
    }

    @Post('test-sm')
    superMemo(@Body() data: any) {
        let item: SuperMemoItem = {
            interval: 0,
            repetition: 0,
            efactor: 2.5,
          };
          
          console.log(item);
          
          item = supermemo(item, 5);
          console.log(item);
        return item
    }

    // get test cards
    @Get('learning-cards/folder/:folderId')
    async getLearningCards(@Request() req, @Res() response, @Param() data: any): Promise<Flashcard[] | null> {
        try {
            const flashcards = await this.flashcardService.getLearningCards(data.folderId)
            return response.status(HttpStatus.OK).json(flashcards)
        }catch(error){
            if(!error.status) {
                throw new Error(error)
            }
            return response.status(error.status).json(error)
        }
    }
    // get next test card
    
    // practice
    @Put('learning/:id')
    async learning(@Request() req, @Res() response, @Body() data: any, @Param('id', ParseIntPipe) id: number) {
        try {
            const flashcard = await this.flashcardService.learning(data.grade, id)
            return response.status(HttpStatus.OK).json(flashcard)
        }catch(error){
            if(!error.status) {
                throw new Error(error)
            }
            return response.status(error.status).json(error)
        }
    }
}
