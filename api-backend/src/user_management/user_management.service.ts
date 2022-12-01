import { Injectable, HttpException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../user/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UserManagementService {

    constructor(
        @InjectRepository(User)
        private userRepository: Repository<User>
    ) { }
    async getListUsers(query: any) {
        try {
            const take = query.take || 20
            const page = parseInt(query.page) || 1
            const skip = (page - 1) * take
            const querySQL = await this.userRepository.createQueryBuilder('user')
                .leftJoin('user.role', 'role')
                .addSelect('role.name')
                .andWhere('role.id = :roleId', { roleId: 3 })
                .orderBy('user.name', 'ASC')
                .skip(skip)
                .take(take)
            const total = await querySQL.getCount()
            const lastPage = Math.ceil(total / take)
            const nextPage = (page + 1 > lastPage) ? null : page + 1
            const prevPage = (page - 1 < 1) ? null : page - 1
            const users = await querySQL.getMany()
            return {
                data: [...users],
                count: total,
                currentPage: page,
                nextPage: nextPage,
                prevPage: prevPage,
                lastPage: lastPage,
                firstPage: 1
            }

        } catch (error) {
            if (!error.status) {
                throw new Error(error)
            }
            throw new HttpException(error.message, error.status)
        }
    }
    async searchUsers(query: any) {
        try {
            const take = query.take || 20
            const page = parseInt(query.page) || 1
            const skip = (page - 1) * take
            const querySQL = await this.userRepository.createQueryBuilder('user')
                .leftJoin('user.role', 'role')
                .addSelect('role.name')
                .andWhere('role.id = :roleId', { roleId: 3 })
                .andWhere('user.name like :name', { name: `%${query.name}%` })
            querySQL.skip(skip)
                    .take(take)
            const total = await querySQL.getCount()
            const lastPage = Math.ceil(total / take)
            const nextPage = (page + 1 > lastPage) ? null : page + 1
            const prevPage = (page - 1 < 1) ? null : page - 1
            const users = await querySQL.getMany()
            console.log(users)
            return {
                data: [...users],
                count: total,
                currentPage: page,
                nextPage: nextPage,
                prevPage: prevPage,
                lastPage: lastPage,
                firstPage: 1
            }

        } catch (error) {
            if (!error.status) {
                throw new Error(error)
            }
            throw new HttpException(error.message, error.status)
        }
    }

    async getDetailUserById(userId: number) {
        try {
            const user = await this.userRepository.createQueryBuilder('user')
                .leftJoin('user.role', 'role')
                .addSelect('role.name')
                .where('user.id = :userId', { userId })
                .andWhere('role.id = :roleId', { roleId: 3 })
                .getOne()
            return user

        } catch (error) {
            if (!error.status) {
                throw new Error(error)
            }
            throw new HttpException(error.message, error.status)
        }
    }

    async deleteUser(id: number) {
        try {
            const user = await this.userRepository.delete(id)
            return user

        } catch (error) {
            if (!error.status) {
                throw new Error(error)
            }
            throw new HttpException(error.message, error.status)
        }
    }
}
