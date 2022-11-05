import { Body, Controller, Delete, Get, HttpStatus, Param, ParseIntPipe, Post, Put, Request, Res, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { createExerciseDto } from './dtos/createExercise.dto';
import { updateExerciseDto } from './dtos/updateExercise.dto';
import { IdentificationExerciseService } from './identification_exercise.service';


@Controller('identification_exercise')
export class IdentificationExerciseController {
    constructor(
        private readonly identificationExerciseService: IdentificationExerciseService
    ){}

    @Get('getbyepisode/:episodeId')
    async getByEpisode(@Request() req, @Res() response, @Param('episodeId', ParseIntPipe) episodeId: number) {
        try{
            const exercises = await this.identificationExerciseService.getByEpisode(episodeId) 
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
            const exercise = await this.identificationExerciseService.getExerciseById(id) 
            return response.status(200).json(exercise)
        }catch(error){
            if(!error.status){
                throw new Error(error)
            }
            return response.status(error.status).json(error)
        }
    }

    @Post('')
    async createIdentificationExercise(@Request() req, @Res() response, @Body() data: createExerciseDto) {
        try{
            const result = await this.identificationExerciseService.createIdentificationExercise(data)
            return response.status(200).json(result)
        }catch(error){
            if(!error.status){
                throw new Error(error)
            }
            return response.status(error.status).json(error)
        }
    }

    @Put(':id')
    async updateIdentificationExercise(@Request() req, @Res() response, @Body() data: updateExerciseDto, @Param('id', ParseIntPipe) id: number) {
        try{
            const result = await this.identificationExerciseService.updateIdentificationExercise(data,id)
            return response.status(200).json(result)
        }catch(error){
            if(!error.status){
                throw new Error(error)
            }
            return response.status(error.status).json(error)
        }
    }
    @Delete(':id')
    async deleteIdentificationExercise(@Request() req, @Res() response, @Param('id', ParseIntPipe) id: number) {
        try{
            const result = await this.identificationExerciseService.deleteIdentificationExercise(id)
            return response.status(200).json(result)
        }catch(error){
            if(!error.status){
                throw new Error(error)
            }
            return response.status(error.status).json(error)
        }
    }
}
