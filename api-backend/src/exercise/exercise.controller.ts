import { Body, Controller, Delete, Get, HttpStatus, Param, ParseIntPipe, Post, Put, Request, Res, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { createExerciseDto } from './dtos/createExercise.dto';
import { updateExerciseDto } from './dtos/updateExercise.dto';
import { ExerciseService } from './exercise.service';

@Controller('exercise')
export class ExerciseController {
    constructor(
        private readonly exerciseService: ExerciseService
    ){}

    @Get('getbyepisode/:episodeId')
    async getByEpisode(@Request() req, @Res() response, @Param('episodeId', ParseIntPipe) episodeId: number) {
        try{
            const exercises = await this.exerciseService.getByEpisode(episodeId) 
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
            const exercise = await this.exerciseService.getExerciseById(id) 
            return response.status(200).json(exercise)
        }catch(error){
            if(!error.status){
                throw new Error(error)
            }
            return response.status(error.status).json(error)
        }
    }

    @Post('')
    async createEpisode(@Request() req, @Res() response, @Body() data: createExerciseDto) {
        try{
            const result = await this.exerciseService.createExercise(data)
            return response.status(200).json(result)
        }catch(error){
            if(!error.status){
                throw new Error(error)
            }
            return response.status(error.status).json(error)
        }
    }

    @Put(':id')
    async updateEpisode(@Request() req, @Res() response, @Body() data: updateExerciseDto, @Param('id', ParseIntPipe) id: number) {
        try{
            const result = await this.exerciseService.updateExercise(data,id)
            return response.status(200).json(result)
        }catch(error){
            if(!error.status){
                throw new Error(error)
            }
            return response.status(error.status).json(error)
        }
    }
    @Delete(':id')
    async deleteEpisode(@Request() req, @Res() response, @Param('id', ParseIntPipe) id: number) {
        try{
            const result = await this.exerciseService.deleteExercise(id)
            return response.status(200).json(result)
        }catch(error){
            if(!error.status){
                throw new Error(error)
            }
            return response.status(error.status).json(error)
        }
    }
}
