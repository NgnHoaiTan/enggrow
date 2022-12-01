import { BadRequestException, HttpException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { FolderFlashcard } from './folder_flashcard.entity';
import { UserService } from '../user/user.service';
import { createFolderDto } from './dtos/createFolder.dto';
import { updateFolderDto } from './dtos/updateFolder.dto';
import { Flashcard } from 'src/flashcard/flashcard.entity';

@Injectable()
export class FolderFlashcardService {
    constructor(
        @InjectRepository(FolderFlashcard)
        private folderRepository: Repository<FolderFlashcard>,
        private userService: UserService,
    ) { }
    // get all folders
    async getAll(): Promise<FolderFlashcard[] | undefined> {
        try {
            return await this.folderRepository.find()
        }
        catch (err) {
            throw new Error(err)
        }
    }
    // get all folders by user
    async getAllByUser(userId: number, query: any): Promise<FolderFlashcard[]> {
        try {
            const user = await this.userService.findUserById(userId)
            if (!user) {
                throw new BadRequestException('user is invalid')
            }
            const querySQL = await this.folderRepository
                .createQueryBuilder('folder_flashcard')
                .leftJoin('folder_flashcard.user', 'user')
                .leftJoinAndSelect('folder_flashcard.flashcard','flashcard')
                .addSelect('user.id')
                .addSelect('user.name')
                .addSelect('user.current_avatar')
                .where('folder_flashcard.userId = :userId', { userId: userId })
            
            if(query.filter === 'due') {
                querySQL.andWhere('flashcard.dueDate <= :date', {date: new Date().toISOString().slice(0, 10)})
            }

            const data = querySQL.getMany()
            return data
        }
        catch (err) {
            console.log(err)
            throw new HttpException(err.message, err.status);
        }
    }

    async getById(id: number): Promise<FolderFlashcard> {
        try {
            const folder = await this.folderRepository.findOneBy({ id })
            if (!folder) throw new NotFoundException('Folder is not found')
            return folder
        } catch (err) {
            throw new HttpException(err.message, err.status);
        }
    }

    async searchByName(name: string) : Promise<FolderFlashcard[]> {
        try {
            const folder = await this.folderRepository
                                    .createQueryBuilder('folder_flashcard')
                                    .where('folder_flashcard.name like :name',{ name:`%${name}%` })
                                    .getMany()
            return folder
        }catch(err){
            throw new Error(err)
        }
    }


    // create folder
    async create(data: createFolderDto): Promise<FolderFlashcard> {
        try {
            const user = await this.userService.findUserById(data.userId)
            if (user) {
                const newFolder = {
                    name: data.name,
                    user: user
                }
                return await this.folderRepository.save(newFolder)
            }
            throw new UnauthorizedException('User is not valid')


        } catch (err) {
            throw new HttpException(err.message, err.status);
        }
    }
    // update folder
    async updateFolder(data: updateFolderDto, id: number): Promise<UpdateResult> {
        try {
            const newupdate = await this.folderRepository.update({id},data)
            return newupdate
        } catch (err) {
            throw new HttpException(err.message, err.status);
        }

    }
    // delete folder
    async deleteFolder(id: number): Promise<DeleteResult> {
        try {
            return await this.folderRepository.delete({ id })
        } catch (err) {
            if(!err.status) throw new Error(err)
            throw new HttpException(err.message, err.status);
        }

    }

    async GetRemindPractice(userId: number){
        try{
            const dueFolder = await this.GetDueFolder(userId)
            if(dueFolder) {
                return dueFolder
            }
            return null
        }catch(error){
            if(!error.status) throw new Error(error)
            throw new HttpException(error.message, error.status);
        }
    }
    

    // get folders which have card need learnt
    async GetDueFolder(userId: number){
        try{
            const folder = await this.folderRepository.createQueryBuilder('folder_flashcard')
                .leftJoinAndSelect('folder_flashcard.flashcard','flashcard')
                // .leftJoinAndSelect('folder_flashcard.user','user')
                .where('folder_flashcard.userId = :userId', { userId: userId })
                .andWhere('flashcard.dueDate <= :date', {date: new Date().toISOString().slice(0, 10)})
                .getMany()
            if(folder) {
                return folder
            }
            return null
        }catch(error){
            console.log(error)
            if(!error.status) throw new Error(error)
            throw new HttpException(error.message, error.status);
        }
    }
}
