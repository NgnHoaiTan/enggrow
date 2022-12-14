import { Injectable, BadRequestException, ForbiddenException } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from 'src/user/dtos/CreateUser.dto';
import { GoogleUserDto } from 'src/user/dtos/GoogleUser.dto';

const saltOrRounds = 10;
@Injectable()
export class AuthService {
    constructor(
        private userService: UserService,
        private jwtService: JwtService
    ) { }
    async hashPassword(password: string): Promise<string> {
        return await bcrypt.hash(password, saltOrRounds)
    }

    async comparePassword(password: string, hashedPassword: string): Promise<any> {
        await bcrypt.compare(password, hashedPassword)
    }

    async validateUser(username: string, password: string): Promise<any> {
        const user = await this.userService.findByUsername(username)
        console.log(user)
        if (user && this.comparePassword(password, user.password)) {
            const { password, ...result } = user;
            return result
        }
        return null
    }

    // async validateGoogleUser(data: { email: string, displayName: string, email_verified: boolean, picture: string,id:string }) {

    //     let user = await this.userService.findByGoogleId(data.id)
    //     if(user) {
    //         return user
    //     }
    //     else {
    //         user = await this.userService.findbyEmail(data.email)
    //         if(!user) {
    //             const newuser: GoogleUserDto = {
    //                 googleId: data.id,
    //                 name:data.displayName,
    //                 email:data.email,
    //                 email_verified:data.email_verified,
    //                 picture:data.picture
    //             }
    //             return await this.userService.signupWithGoogle(newuser)
    //         }
    //         throw new ForbiddenException(
    //             "Email is already in use"
    //         );
    //     }

    // }

    async login(user: any) {
        const payload = { username: user.username, sub: user.id };
        return {
            user: user,
            access_token: this.jwtService.sign(payload),
        };
    }

    async signup(SignupInfo: CreateUserDto) {
        try {
            const user = await this.userService.findByUsername(SignupInfo.username)
            const phone_number = await this.userService.findUserByPhone(SignupInfo.phone_number)
            if (user) {
                throw new BadRequestException('Username is already exist')
            }
            if (phone_number) {
                throw new BadRequestException('Phone number is in use')
            }
            
            const hashed = await this.hashPassword(SignupInfo.password)
            const data: CreateUserDto = {
                name: SignupInfo.name,
                phone_number: SignupInfo.phone_number,
                username: SignupInfo.username,
                password: hashed
            }
            const newuser = await this.userService.signup(data)
            return newuser

        } catch (error) {
            throw new BadRequestException(error)
        }

    }
}
