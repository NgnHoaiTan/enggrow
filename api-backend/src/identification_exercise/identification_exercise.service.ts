import { HttpException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EpisodeService } from '../episode/episode.service';
import { Repository } from 'typeorm';
import { createExerciseDto } from './dtos/createExercise.dto';
import { updateExerciseDto } from './dtos/updateExercise.dto';
import { IdentificationExercise } from './identification_exercise.entity';

@Injectable()
export class IdentificationExerciseService {
    constructor(
        @InjectRepository(IdentificationExercise)
        private exerciseRepository: Repository<IdentificationExercise>,
        private episodeSerive: EpisodeService
    ){}

    async getByEpisode(episodeId: number) {
        try {
            const exercises = await this.exerciseRepository.createQueryBuilder('identification_exercise')
                    .where('identification_exercise.episodeId = :episodeId',{episodeId})
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
                    .where('identification_exercise.id = :id',{id: exerciseId})
                    .getOne()
            return exercise
        } catch (error) {
            if (!error.status) {
                throw new Error(error)
            }
            throw new HttpException(error.message, error.status)
        }
    }
    async createIdentificationExercise(data: any) {
        try {
            const episode = await this.episodeSerive.getEpisodeById(data.episodeId)
            if(episode) {
                const exerciseData = {

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
    async updateIdentificationExercise(data: any, id: number) {
        try {
            const exerciseData = {
                true_word: data.true_word,
                false_word: data.false_word,

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
    async deleteIdentificationExercise(id: number) {
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
