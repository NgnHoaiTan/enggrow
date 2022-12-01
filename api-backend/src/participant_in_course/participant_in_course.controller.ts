import { Body, Controller, Delete, Get, HttpStatus, Param, ParseIntPipe, Post, Put, Request, Res, UseGuards, UploadedFile, UseInterceptors, BadRequestException } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { ParticipantInCourseService } from './participant_in_course.service';

@Controller('participant-in-course')
export class ParticipantInCourseController {
    constructor(
        private readonly participantService: ParticipantInCourseService,
    ){}
    @UseGuards(JwtAuthGuard)
    @Get('getall')
    async getAllParticipants(@Res() response) {
        try{
            const participants = await this.participantService.getAllParticipants()
            return response.status(200).json(participants)
        }catch(error){
            if(!error.status){
                throw new Error(error)
            }
            return response.status(error.status).json(error)
        }
    }

    @UseGuards(JwtAuthGuard)
    @Get('bycourse/:courseId')
    async getAllParticipantsByCourse(@Request() req, @Res() response, @Param('courseId', ParseIntPipe) courseId: number){
        try{
            const participants = await this.participantService.getAllParticipantsByCourse(courseId);
            return response.status(200).json(participants)
        }catch(error){
            if(!error.status){
                throw new Error(error)
            }
            return response.status(error.status).json(error)
        }
    }

    @UseGuards(JwtAuthGuard)
    @Get('byuser/:userId')
    async getAllParticipantsByUser(@Request() req, @Res() response, @Param('userId', ParseIntPipe) userId: number){
        try{
            const participants = await this.participantService.getAllParticipantsByUser(userId);
            return response.status(200).json(participants)
        }catch(error){
            if(!error.status){
                throw new Error(error)
            }
            return response.status(error.status).json(error)
        }
    }

    @UseGuards(JwtAuthGuard)
    @Get('registered-course')
    async getAllMyRegisteredCourse(@Request() req, @Res() response){
        try{
            let userId = req.user.userId
            const participants = await this.participantService.getAllParticipantsByUser(userId);
            return response.status(200).json(participants)
        }catch(error){
            if(!error.status){
                throw new Error(error)
            }
            return response.status(error.status).json(error)
        }
    }

    @UseGuards(JwtAuthGuard)
    @Get('recent-register')
    async StatisticRecentRegister(@Request() req, @Res() response) {
        try{
            const registered = await this.participantService.StatisticRecentRegister()
            return response.status(200).json(registered)
        }catch(error){
            if(!error.status){
                throw new Error(error)
            }
            return response.status(error.status).json(error)
        }
    }

    @UseGuards(JwtAuthGuard)
    @Post('check-register')
    async checkRegister(@Request() req, @Res() response, @Body() data: any) {
        try{
            const user = req.user
            const participant = await this.participantService.checkRegister(data.courseId, user.userId);
           
            return response.status(200).json(participant)
        }catch(error){
            if(!error.status){
                throw new Error(error)
            }
            return response.status(error.status).json(error)
        }
    }

    @UseGuards(JwtAuthGuard)
    @Post('')
    async registerParticipant(@Request() req, @Res() response, @Body() data: any){
        try{
            const user = req.user
            let dataCreate = {
                userId: user.userId,
                courseId: data.courseId
            }
            const participant = await this.participantService.registerParticipant(dataCreate);
            return response.status(200).json(participant)
        }catch(error){
            if(!error.status){
                throw new Error(error)
            }
            return response.status(error.status).json(error)
        }
    }
}

