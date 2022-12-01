import { Injectable, HttpException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FlashcardService } from 'src/flashcard/flashcard.service';
import { UserService } from 'src/user/user.service';
import { Repository } from 'typeorm';
import { CardPronunciationResult } from './card_pronunciation_result.entity';

@Injectable()
export class CardPronunciationResultService {
    constructor(
        @InjectRepository(CardPronunciationResult)
        private cardPronounceRepository: Repository<CardPronunciationResult>,
        private flashcardService: FlashcardService,
        private userService: UserService
    ){}
    async getHistoryResultById(id: number) {
        try {
            const result = await this.cardPronounceRepository.findOneBy({id})
            return result
        }catch (error) {
            if (!error.status) {
                throw new Error(error)
            }
            throw new HttpException(error.message, error.status)
        } 
    }
    
    async getTodayHistoryResultOfUser(userId: number) {
        try {
            const results = await this.cardPronounceRepository.createQueryBuilder('card_pronunciation_result')
                .where('card_pronunciation_result.userId = :userId',{userId})
                .andWhere('card_pronunciation_result.created_at = :today',{today: new Date().toISOString().slice(0, 10)})
                .getMany()
            return results
        }catch (error) {
            if (!error.status) {
                throw new Error(error)
            }
            throw new HttpException(error.message, error.status)
        } 
    }

    async getHistoryResultByFlashcard(flashcardId: number) {
        try {
            const results = await this.cardPronounceRepository.createQueryBuilder('card_pronunciation_result')
                .where('card_pronunciation_result.flashcardId = :flashcardId',{flashcardId})
                .getMany()
            return results
        }catch (error) {
            if (!error.status) {
                throw new Error(error)
            }
            throw new HttpException(error.message, error.status)
        } 
    }

    async saveHistoryResult(data: any){
        try {
            let flashcard = await this.flashcardService.getById(data.flashcardId)
            let user = await this.userService.findUserById(data.userId)
            if(!flashcard) {
                throw new NotFoundException('Flashcard is invalid when save result')
            }
            if(!user) {
                throw new NotFoundException('User is invalid when save result')
            }
            const dataResult = {
                score_gain: data.score_gain,
                flashcard: flashcard,
                pronounce_url: data.pronounce.secure_url,
                pronounce_id: data.pronounce.public_id,
                user: user
            }
            const resultCreate = await this.cardPronounceRepository.save(dataResult)
            return resultCreate
        }catch (error) {
            if (!error.status) {
                throw new Error(error)
            }
            throw new HttpException(error.message, error.status)
        }
    }
    async deleteHistoryResult(id: number){
        try {
            const results = await this.cardPronounceRepository.delete({id})
            return results
        }catch (error) {
            if (!error.status) {
                throw new Error(error)
            }
            throw new HttpException(error.message, error.status)
        }
    }
}
