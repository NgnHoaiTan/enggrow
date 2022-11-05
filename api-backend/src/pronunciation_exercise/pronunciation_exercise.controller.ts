import { Body, Controller, Delete, Get, HttpStatus, Param, ParseIntPipe, Post, Put, Request, Res, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { createExerciseDto } from './dtos/createExercise.dto';
import { updateExerciseDto } from './dtos/updateExercise.dto';
import { PronunciationExerciseService } from './pronunciation_exercise.service';


@Controller('pronunciation_exercise')
export class PronunciationExerciseController {
    constructor(
        private readonly pronunExerciseService: PronunciationExerciseService
    ){}

    @Get('getbyepisode/:episodeId')
    async getByEpisode(@Request() req, @Res() response, @Param('episodeId', ParseIntPipe) episodeId: number) {
        try{
            const exercises = await this.pronunExerciseService.getByEpisode(episodeId) 
            return response.status(200).json(exercises)
        }catch(error){
            if(!error.status){
                throw new Error(error)
            }
            return response.status(error.status).json(error)
        }
    }
    
    @Get(':id')
    async getById(@Request() req, @Res() response, @Param('id', ParseIntPipe) id: number) {
        try{
            const exercise = await this.pronunExerciseService.getExerciseById(id) 
            return response.status(200).json(exercise)
        }catch(error){
            if(!error.status){
                throw new Error(error)
            }
            return response.status(error.status).json(error)
        }
    }

    @Post('')
    async createPronunciationExercise(@Request() req, @Res() response, @Body() data: createExerciseDto) {
        try{
            const result = await this.pronunExerciseService.createExercise(data)
            return response.status(200).json(result)
        }catch(error){
            if(!error.status){
                throw new Error(error)
            }
            return response.status(error.status).json(error)
        }
    }

    @Put(':id')
    async updatePronunciationExercise(@Request() req, @Res() response, @Body() data: updateExerciseDto, @Param('id', ParseIntPipe) id: number) {
        try{
            const result = await this.pronunExerciseService.updateExercise(data,id)
            return response.status(200).json(result)
        }catch(error){
            if(!error.status){
                throw new Error(error)
            }
            return response.status(error.status).json(error)
        }
    }
    @Delete(':id')
    async deletePronunciationExercise(@Request() req, @Res() response, @Param('id', ParseIntPipe) id: number) {
        try{
            const result = await this.pronunExerciseService.deleteExercise(id)
            return response.status(200).json(result)
        }catch(error){
            if(!error.status){
                throw new Error(error)
            }
            return response.status(error.status).json(error)
        }
    }
}
