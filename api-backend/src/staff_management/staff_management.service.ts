import { HttpException, Injectable, BadRequestException} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../user/user.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from 'src/user/dtos/CreateUser.dto';
import { RoleService } from 'src/role/role.service';
import { createNewStaffDto } from './dtos/createNewStaff.dto';
import { UserService } from 'src/user/user.service';

@Injectable()
export class StaffManagementService {
    constructor(
        @InjectRepository(User)
        private staffRepository: Repository<User>,
        private roleService: RoleService,
        private userService: UserService
    ){}

    async getAllStaffs(query: any) {
        try {
            const querySQL = await this.staffRepository.createQueryBuilder('user')
                .leftJoin('user.role','role')
                .addSelect('role.name')
                .andWhere('role.id = :roleId',{roleId: 2})
            if(query.name) {
                querySQL.andWhere('user.name =:name',{name:`%${query.name}%`})
            }
            const staffs = querySQL.getMany()
            return staffs

        } catch (error) {
            if (!error.status) {
                throw new Error(error)
            }
            throw new HttpException(error.message, error.status)
        }
    }

    async getDetailStaffById(staffId: number) {
        try {
            const staff = await this.staffRepository.createQueryBuilder('user')
                .leftJoin('user.role','role')
                .leftJoinAndSelect('user.staff_profile','staff_profile')
                .leftJoinAndSelect('staff_profile.staff_experience','staff_experience')
                .addSelect('role.name')
                .where('user.id = :staffId',{staffId: staffId})
                .andWhere('role.id = :roleId',{roleId: 2})
                .getOne()
            return staff

        } catch (error) {
            if (!error.status) {
                throw new Error(error)
            }
            throw new HttpException(error.message, error.status)
        }
    }

    async registerNewStaff(data: createNewStaffDto) {
        try {
            let role = await this.roleService.getRoleById(2)
            let existUsername = await this.userService.findByUsername(data.username)
            if(existUsername) {
                throw new BadRequestException('Username is exist already')
            }
            const newStaff = {
                ...data,
                role: role
            }
            const staff = await this.staffRepository.save(newStaff)
            return staff
        } catch (error) {
            if (!error.status) {
                throw new Error(error)
            }
            throw new HttpException(error.message, error.status)
        }
    }
    async deleteStaffs(id: number) {
        try {
            const staff = await this.staffRepository.delete(id)
            return staff

        } catch (error) {
            if (!error.status) {
                throw new Error(error)
            }
            throw new HttpException(error.message, error.status)
        }
    }
}
