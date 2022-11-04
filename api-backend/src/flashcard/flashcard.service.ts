import { HttpException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { supermemo, SuperMemoItem, SuperMemoGrade } from 'supermemo'
import * as dayjs from 'dayjs'
import { FolderFlashcardService } from 'src/folder_flashcard/folder_flashcard.service';
import { UserService } from 'src/user/user.service';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { createCardDto } from './dtos/createCard.dto';
import { updateCardDto } from './dtos/updateCard.dto';
import { Flashcard } from './flashcard.entity';
import { cardType } from './dtos/cardTypes';


@Injectable()
export class FlashcardService {
    constructor(
        @InjectRepository(Flashcard)
        private flashcardRepository: Repository<Flashcard>,
        private folderService: FolderFlashcardService,
    ) { }

    async getAll(folderId: number): Promise<Flashcard[]> {
        try {
            return await this.flashcardRepository.find({ where: { folder_flashcard: { id: folderId } } })
        } catch (err) {
            throw new Error(err)
        }
    }

    async getById(id: number): Promise<Flashcard | undefined> {
        try {
            return await this.flashcardRepository.findOneBy({ id })
        } catch (err) {
            throw new Error(err)
        }
    }

    async createCard(data: createCardDto): Promise<Flashcard> {
        try {
            const folder = await this.folderService.getById(data.folderId)
            if (folder) {
                const newCard = {
                    term: data.term,
                    meaning: data.meaning,
                    example: data.example,
                    folder_flashcard: folder
                }
                return await this.flashcardRepository.save(newCard)
            }
            else {
                throw new NotFoundException('folder is not valid')
            }
        } catch (err) {
            throw new HttpException(err.message, err.status)
        }
    }

    async updateCard(data: updateCardDto, id: number): Promise<UpdateResult> {
        try {
            const newupdate = await this.flashcardRepository.update({ id }, data)
            return newupdate
        } catch (error) {
            throw new HttpException(error.message, error.status)
        }


    }
    // delete folder
    async deleteCard(id: number): Promise<DeleteResult> {
        try {
            const foundCard = await this.getById(id)
            if (foundCard) {
                return await this.flashcardRepository.delete({ id })
            }
            else {
                throw new NotFoundException('Card is not valid')
            }
        } catch (error) {
            throw new HttpException(error.message, error.status)
        }

    }

    async getPracticeCards(folderId: number): Promise<Flashcard[]> {
        try {
            const flashcards = await this.flashcardRepository.createQueryBuilder('flashcard')
                .where('flashcard.folderFlashcardId = :folderId', { folderId: folderId })
                .andWhere('flashcard.dueDate <= :date', { date: new Date().toISOString().slice(0, 10) })
                .orderBy('flashcard.repetition', 'ASC')
                .getMany()
            return flashcards
        } catch (error) {
            if (!error.status) {
                throw new Error(error)
            }
            throw new HttpException(error.message, error.status)
        }
    }

    // get next test card


    async practice(grade: any, id: number): Promise<any> {
        try {
            const flashcard = await this.getById(id)
            const { interval, repetition, efactor } = supermemo(flashcard, grade)
            // const dueDate = dayjs(Date.now()).add(interval, 'day').toISOString().slice(0, 10)
            const newData = {
                interval: interval,
                repetition: repetition,
                efactor: efactor,
                // dueDate: dueDate,
                type: cardType.learning
            }
            return await this.flashcardRepository.update({ id }, newData)
        } catch (error) {
            if (!error.status) {
                throw new Error(error)
            }
            throw new HttpException(error.message, error.status)
        }
    }

}
