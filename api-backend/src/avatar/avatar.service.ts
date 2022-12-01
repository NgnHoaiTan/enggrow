import { Injectable, HttpException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserService } from 'src/user/user.service';
import { Repository } from 'typeorm';
import { Avatar } from './avatar.entity';

@Injectable()
export class AvatarService {
    constructor(
        @InjectRepository(Avatar)
        private avatarRepository: Repository<Avatar>,
        private userService: UserService
    ){}

    async getAvatarById(avatarId) {
        try {
            const avatar = await this.avatarRepository.findOneBy({id: avatarId})
            return avatar
        }catch (error) {
            if (!error.status) {
                throw new Error(error)
            }
            throw new HttpException(error.message, error.status)
        }
    }

    async getAlbumsAvatarOfUser(userId: number) {
        try {
            const avatars = await this.avatarRepository.createQueryBuilder('avatar')
                .leftJoin('avatar.user','user')
                .addSelect('user.id', 'userId')
                .where('user.id = :userId',{userId})
                .orderBy('avatar.created_at','DESC')
                .getMany()
            return avatars
        }catch (error) {
            if (!error.status) {
                throw new Error(error)
            }
            throw new HttpException(error.message, error.status)
        }
    }
    
    async uploadNewAvatar(avatar: any, userId: number) {
        try {
            let user = await this.userService.findUserById(userId)
            if(user) {
                const data = {
                    image_url: avatar.secure_url,
                    image_id: avatar.public_id,
                    user:user
                }
                const newAvatar  = await this.avatarRepository.save(data)
                return newAvatar
            } throw new UnauthorizedException('Unauthorize')
            
        }catch (error) {
            if (!error.status) {
                throw new Error(error)
            }
            throw new HttpException(error.message, error.status)
        }
    }

    async deleteAvatar(avatarId: number) {
        try {
            const avatar = await this.avatarRepository.delete({id: avatarId})
            return avatar
        }catch (error) {
            if (!error.status) {
                throw new Error(error)
            }
            throw new HttpException(error.message, error.status)
        }
    }

}
