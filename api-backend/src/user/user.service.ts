import { Injectable, Inject } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { urlToHttpOptions } from 'url';
import { CreateUserDto } from './dtos/CreateUser.dto';
import { GoogleUserDto } from './dtos/GoogleUser.dto';
import { User } from './user.entity';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User)
        private userRepository: Repository<User>
    ){}

    async findAll(): Promise<User[] | undefined> {
        return await this.userRepository.find();
    }
    async findUserById(id: any): Promise<User | undefined> {
        return await this.userRepository.findOne({where:{id:id}})
    }
    async findUserByPhone(phone_number: string): Promise<User | undefined> {
        return await this.userRepository.findOne({where:{phone_number:phone_number}})
    }

    // async findByGoogleId(googleId:string): Promise<User | undefined> {
    //     return await this.userRepository.findOneBy({googleId})
    // }
    // async findbyEmail(email:string): Promise<User> {
    //     return await this.userRepository.findOneBy({email: email})
    // }

    async findByUsername(username: string): Promise<User | undefined> {
        return await this.userRepository.findOneBy({username})
    }
    async signup(user: CreateUserDto): Promise<any> {
        try{
            const newuser = await this.userRepository.save(user)
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
