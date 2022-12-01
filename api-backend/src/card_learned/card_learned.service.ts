import { Injectable, HttpException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FlashcardService } from 'src/flashcard/flashcard.service';
import { UserService } from 'src/user/user.service';
import { Repository } from 'typeorm';
import { CardLearned } from './card_learned.entity';

@Injectable()
export class CardLearnedService {
    constructor(
        @InjectRepository(CardLearned)
        private cardLearnRepository: Repository<CardLearned>,
        private flashcardService: FlashcardService,
        private userService: UserService
    ) { }

    async getAllResultOfUserGroupByDate(userId: number) {
        try {

        } catch (error) {
            if (!error.status) {
                throw new Error(error)
            }
            throw new HttpException(error.message, error.status)
        }
    }

    async getTodayResultOfUser(userId: number) {
        try {
            const results = await this.cardLearnRepository.createQueryBuilder('card_learned')
                .leftJoinAndSelect('card_learned.flashcard', 'flashcard')
                .where('card_learned.userId = :userId', { userId })
                .andWhere('card_learned.created_at >= :today', { today: new Date().toISOString().slice(0, 10) })
                .getMany()
            return results
        } catch (error) {
            if (!error.status) {
                throw new Error(error)
            }
            throw new HttpException(error.message, error.status)
        }
    }

    async getResultOfUserByDuration(userId: number, query: any) {
        try {
            const querySQL = await this.cardLearnRepository.createQueryBuilder('card_learned')
                .leftJoinAndSelect('card_learned.flashcard', 'flashcard')
                .where('card_learned.userId = :userId', { userId })

            if (!query || query.duration == 1 || !query.duration) {
                querySQL.andWhere('card_learned.created_at >= :today', { today: new Date().toISOString().slice(0, 10) })
            }
            else if(query.duration) {
                let date = new Date()
                let duration = query.duration
                let getPreviousDate = new Date(date.setDate(date.getDate() - duration))
                querySQL.andWhere('card_learned.created_at > :date', { date: getPreviousDate.toISOString().slice(0, 10) })
            }
            const results = querySQL.getMany()
            return results
        } catch (error) {
            if (!error.status) {
                throw new Error(error)
            }
            throw new HttpException(error.message, error.status)
        }
    }

    async saveHistoryResult(data: any) {
        try {
            let flashcard = await this.flashcardService.getById(data.flashcardId)
            let user = await this.userService.findUserById(data.userId)
            if (!flashcard) {
                throw new NotFoundException('Flashcard is invalid when save result')
            }
            if (!user) {
                throw new NotFoundException('User is invalid when save result')
            }
            const dataResult = {
                score_gain: data.score_gain,
                flashcard: flashcard,
                user: user
            }
            const resultCreate = await this.cardLearnRepository.save(dataResult)
            return resultCreate
        } catch (error) {
            if (!error.status) {
                throw new Error(error)
            }
            throw new HttpException(error.message, error.status)
        }
    }

    async deleteHistoryResult(id: number) {
        try {
            const results = await this.cardLearnRepository.delete({ id })
            return results
        } catch (error) {
            if (!error.status) {
                throw new Error(error)
            }
            throw new HttpException(error.message, error.status)
        }
    }
}
