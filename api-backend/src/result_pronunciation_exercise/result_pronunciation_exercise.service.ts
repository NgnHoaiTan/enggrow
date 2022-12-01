import { HttpException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserService } from '../user/user.service';
import { DeleteResult, Repository } from 'typeorm';
import { createDataDto } from './dtos/createData.dto';
import { ResultPronunciationExercise } from './result_pronunciation_exercise.entity';
import { PronunciationExerciseService } from '../pronunciation_exercise/pronunciation_exercise.service';

@Injectable()
export class ResultPronunciationExerciseService {
    constructor(
        @InjectRepository(ResultPronunciationExercise)
        private resultRepository: Repository<ResultPronunciationExercise>,
        private userService: UserService,
        private exerciseService: PronunciationExerciseService
    ) { }

    async getResultById(resultId: number) {
        try {
            const result = await this.resultRepository.findOneBy({ id: resultId })
            return result
        } catch (error) {
            if (!error.status) {
                throw new Error(error)
            }
            throw new HttpException(error.message, error.status)
        }
    }
    async getAllResultByUserAndExercise(userId: number, exerciseId: number) {
        try {
            const results = await this.resultRepository.createQueryBuilder('result_pronunciation_exercise')
                .leftJoinAndSelect('result_pronunciation_exercise.word_assessment', 'word_assessment')
                .leftJoinAndSelect('word_assessment.phone_assessment', 'phone_assessment')
                .where('result_pronunciation_exercise.userId = :userId', { userId })
                .andWhere('result_pronunciation_exercise.exerciseId = :exerciseId', { exerciseId })
                .getMany()
            
            return results
        } catch (error) {
            if (!error.status) {
                throw new Error(error)
            }
            throw new HttpException(error.message, error.status)
        }
    }
    async getNewestResultByUserAndExercise(userId: number, exerciseId: number) {
        try {
            const result = await this.resultRepository.createQueryBuilder('result_pronunciation_exercise')
                .leftJoinAndSelect('result_pronunciation_exercise.word_assessment', 'word_assessment')
                .leftJoinAndSelect('word_assessment.phone_assessment', 'phone_assessment')
                .where('result_pronunciation_exercise.userId = :userId', { userId })
                .andWhere('result_pronunciation_exercise.exerciseId = :exerciseId', { exerciseId })
                .orderBy('result_pronunciation_exercise.created_at', 'DESC')
                .getOne()

            return result
        } catch (error) {
            if (!error.status) {
                throw new Error(error)
            }
            throw new HttpException(error.message, error.status)
        }
    }
    async createResult(data: createDataDto) {
        try {
            let user = await this.userService.findUserById(data.userId)
            let exercise = await this.exerciseService.getExerciseById(data.exerciseId)
            const createData = {
                pronounce_url: data.pronounce_file.secure_url,
                pronounce_id: data.pronounce_file.public_id,
                score_gain: data.score_gain,
                user: user,
                exercise: exercise

            }
            const results = await this.resultRepository.save(createData)
            return results
        } catch (error) {
            if (!error.status) {
                throw new Error(error)
            }
            throw new HttpException(error.message, error.status)
        }
    }
    async DeleteResult(id: number) {
        try {
            const resultDelete = await this.resultRepository.delete({ id })
            return resultDelete
        } catch (error) {
            if (!error.status) {
                throw new Error(error)
            }
            throw new HttpException(error.message, error.status)
        }
    }
}
