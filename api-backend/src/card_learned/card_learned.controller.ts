import { Controller, Get, Post, Query, Param, Body, Res, HttpStatus, UseGuards, Request, UnauthorizedException} from '@nestjs/common';
import { NotFoundException, BadRequestException, ParseIntPipe } from '@nestjs/common'
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { CardLearnedService } from './card_learned.service';

@Controller('card-learned')
export class CardLearnedController {
    constructor(
        private readonly cardLearnService: CardLearnedService
    ){}

    @UseGuards(JwtAuthGuard)
    @Get('getall/bydate')
    async getAllResultOfUserGroupByDate(@Request() req, @Res() response) {
        try {
            
        } catch (error) {
            if (!error.status) {
                throw new Error(error)
            }
            return response.status(error.status).json(error)
        }
    }

    @UseGuards(JwtAuthGuard)
    @Get('/byuser')
    async getResultOfUserByDuration(@Request() req, @Res() response, @Query() query) {
        try {
            const results = await this.cardLearnService.getResultOfUserByDuration(req.user.userId, query)
            return response.status(200).json(results)
        } catch (error) {
            if (!error.status) {
                throw new Error(error)
            }
            return response.status(error.status).json(error)
        }
    }

    @UseGuards(JwtAuthGuard)
    @Get('today/byuser')
    async getTodayCardLearned(@Request() req, @Res() response) {
        try {
            const results = await this.cardLearnService.getTodayResultOfUser(req.user.userId)
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
    async saveHistoryResult(@Request() req, @Res() response, @Body() rawData: any) {
        try {
            const data = {
                score_gain: rawData.score_gain,
                flashcardId: rawData.flashcardId,
                userId: rawData.userId
            }
            const results = await this.cardLearnService.saveHistoryResult(data)
            return response.status(200).json(results)
        } catch (error) {
            if (!error.status) {
                throw new Error(error)
            }
            return response.status(error.status).json(error)
        }
    }


}
