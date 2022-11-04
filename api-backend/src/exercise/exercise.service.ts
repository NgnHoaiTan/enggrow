import { HttpException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EpisodeService } from 'src/episode/episode.service';
import { Repository } from 'typeorm';
import { createExerciseDto } from './dtos/createExercise.dto';
import { updateExerciseDto } from './dtos/updateExercise.dto';
import { Exercise } from './exercise.entity';

@Injectable()
export class ExerciseService {
    constructor(
        @InjectRepository(Exercise)
        private exerciseRepository: Repository<Exercise>,
        private episodeSerive: EpisodeService
    ){}

    async getByEpisode(episodeId: number) {
        try {
            const exercises = await this.exerciseRepository.createQueryBuilder('exercise')
                    .where('exercise.episodeId = :episodeId',{episodeId})
                    .getMany()
            return exercises
        } catch (error) {
            if (!error.status) {
                throw new Error(error)
            }
            throw new HttpException(error.message, error.status)
        }
    }
    async getExerciseById(exerciseId: number) {
        try {
            const exercise = await this.exerciseRepository.createQueryBuilder('exercise')
                    .where('exercise.id = :id',{id: exerciseId})
                    .getOne()
            return exercise
        } catch (error) {
            if (!error.status) {
                throw new Error(error)
            }
            throw new HttpException(error.message, error.status)
        }
    }
    async createExercise(data: createExerciseDto) {
        try {
            const episode = await this.episodeSerive.getEpisodeById(data.episodeId)
            if(episode) {
                const exerciseData = {
                    phrase: data.phrase,
                    episode: episode
                }
                const newExercise = await this.exerciseRepository.save(exerciseData)
                return newExercise
            }else{
                throw new NotFoundException('episode is invalid')
            }
            
        } catch (error) {
            if (!error.status) {
                throw new Error(error)
            }
            throw new HttpException(error.message, error.status)
        }
    }
    async updateExercise(data: updateExerciseDto, id: number) {
        try {
            const exerciseData = {
                phrase: data.phrase,
            }
            const newExercise = await this.exerciseRepository.update({id},exerciseData)
            return newExercise
            
        } catch (error) {
            if (!error.status) {
                throw new Error(error)
            }
            throw new HttpException(error.message, error.status)
        }
    }
    async deleteExercise(id: number) {
        try {
            const result = await this.exerciseRepository.delete({id})
            return result
            
        } catch (error) {
            if (!error.status) {
                throw new Error(error)
            }
            throw new HttpException(error.message, error.status)
        }
    }
}
