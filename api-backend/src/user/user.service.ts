import { Injectable,  HttpException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { RoleService } from '../role/role.service';
import { Repository } from 'typeorm';
import { urlToHttpOptions } from 'url';
import { CreateUserDto } from './dtos/CreateUser.dto';
import { GoogleUserDto } from './dtos/GoogleUser.dto';
import { User } from './user.entity';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User)
        private userRepository: Repository<User>,
        private roleService: RoleService
    ){}

    async findAll(): Promise<User[] | undefined> {
        return await this.userRepository.find();
    }
    async findUserById(id: any): Promise<User | undefined> {
        return await this.userRepository.findOne({where:{id:id}})
    }

    async findByUsername(username: string): Promise<User | undefined> {
        const user = await this.userRepository.createQueryBuilder('user')
            .leftJoin('user.role','role')
            .addSelect('role.id')
            .addSelect('role.name')
            .where('user.username =:username',{username})
            .getOne()
        return  user
    }

    async loginByAdmin(username: string) {
        const admin = await this.userRepository.createQueryBuilder('user')
            .leftJoin('user.role','role')
            .addSelect('role.id')
            .addSelect('role.name')
            .where('user.username =:username',{username})
            .andWhere('role.id = :adminRole', {adminRole: 1})
            .orWhere('role.id = staffRole',{staffRole:2})
            .getOne()
        return  admin
    }

    async findByEmail(email: string): Promise<User | undefined> {
        return await this.userRepository.findOneBy({email})
    }
    async findUserByPhone(phone_number: string) {
        try {
            const user = await this.userRepository.createQueryBuilder('user')
                    .where('user.phone_number = :phone_number',{phone_number})
                    .getOne()
            return user
        } catch (error) {
            if (!error.status) {
                throw new Error(error)
            }
            throw new HttpException(error.message, error.status)
        } 
    }

    async getInfomationOfUser(userId: number) {
        try {
            const user = await this.userRepository.createQueryBuilder('user')
                    .where('user.id = :userId', {userId})
                    .getOne()
            return user
        } catch (error) {
            if (!error.status) {
                throw new Error(error)
            }
            throw new HttpException(error.message, error.status)
        }  
    }

    async getMyStaffProfile(userId: number) {
        try {
            const staff = await this.userRepository.createQueryBuilder('user')
                    .leftJoinAndSelect('user.staff_profile','staff_profile')
                    .leftJoinAndSelect('staff_profile.staff_experience','staff_experience')
                    .where('user.id = :userId', {userId})
                    .getOne()
            return staff
        } catch (error) {
            if (!error.status) {
                throw new Error(error)
            }
            throw new HttpException(error.message, error.status)
        }  
    }
    async createInfomation(data: any) {
        try {
            let dataUser = {
                address: data.address,
                email: data.email,
                phone_number: data.phone_number,
                dob: data.dob
            }
            const newUser = await this.userRepository.save(dataUser)

            return newUser
        } catch (error) {
            if (!error.status) {
                throw new Error(error)
            }
            throw new HttpException(error.message, error.status)
        } 
    }

    async updateInformation(data: any, userId: number) {
        try {
            let oldData = await this.findUserById(userId)
            console.log(data)
            let dataUpdate = {
                name: data.name ? data.name : oldData.name,
                address: data.address ? data.address : oldData.address,
                email: data.email ? data.email : oldData.email,
                phone_number: data.phone_number ? data.phone_number : oldData.phone_number,
                dob: data.dob
            }
            const newUser = await this.userRepository.update({id: userId}, dataUpdate)
            return newUser
        } catch (error) {
            if (!error.status) {
                throw new Error(error)
            }
            throw new HttpException(error.message, error.status)
        }  
    }

    async updateCurrentAvatar(avatar_url: string, userId: number) {
        try {
            let dataUpdate = {
                current_avatar: avatar_url
            }
            const newUser = await this.userRepository.update({id: userId}, dataUpdate)
            return newUser
        } catch (error) {
            if (!error.status) {
                throw new Error(error)
            }
            throw new HttpException(error.message, error.status)
        }  
    } 

    async saveProfileToUser(profile: any, userId) {
        try {
            let data = {
                staff_profile: profile
            }
            const newUser = await this.userRepository.update({id: userId}, data)
            return newUser
        } catch (error) {
            if (!error.status) {
                throw new Error(error)
            }
            throw new HttpException(error.message, error.status)
        } 
    }




    async signup(user: CreateUserDto): Promise<any> {
        try{
            let role = await this.roleService.getRoleById(3)
            const data = {
                ...user,
                role: role
            }
            const newuser = await this.userRepository.save(data)
            const {password,...result} = newuser
            return result
        }
        catch(err) {
            throw new Error(err)
        }
    }
    async signupWithGoogle(data: GoogleUserDto):Promise<User | undefined> {
        try {  
            return await this.userRepository.save(data)
        }catch(err){
            throw new Error(err)
        }
    }
    
}
