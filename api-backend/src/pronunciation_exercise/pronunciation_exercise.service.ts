
import { HttpException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EpisodeService } from 'src/episode/episode.service';
import { Repository } from 'typeorm';
import { createExerciseDto } from './dtos/createExercise.dto';
import { updateExerciseDto } from './dtos/updateExercise.dto';
import { PronunciationExercise } from './pronunciation_exercise.entity';


@Injectable()
export class PronunciationExerciseService {
    constructor(
        @InjectRepository(PronunciationExercise)
        private exerciseRepository: Repository<PronunciationExercise>,
        private episodeSerive: EpisodeService
    ){}

    async getByEpisode(episodeId: number) {
        try {
            const exercises = await this.exerciseRepository.createQueryBuilder('pronunciation_exercise')
                    .where('pronunciation_exercise.episodeId = :episodeId',{episodeId})
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
            const exercise = await this.exerciseRepository.createQueryBuilder('pronunciation_exercise')
                    .where('pronunciation_exercise.id = :id',{id: exerciseId})
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
                    meaning: data.meaning,
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
                meaning: data.meaning,
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
