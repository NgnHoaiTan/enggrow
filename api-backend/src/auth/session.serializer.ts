import { PassportSerializer } from "@nestjs/passport";
import { AuthService } from "./auth.service";
import {Injectable} from '@nestjs/common'
import { User } from "src/user/user.entity";
import { UserService } from "src/user/user.service";

@Injectable()
export class SessionSerializer extends PassportSerializer {
    constructor(
        private readonly authService: AuthService,
        protected readonly userService: UserService
    ){
        super()
    }
    serializeUser(user: User, done: Function) {
        console.log('serialize')
        done(null, user)
    }
    async deserializeUser(payload: any, done: Function) {
        const user = await this.userService.findUserById(payload.id)
        console.log('deserializeUser')
        console.log(user)
        return user ? done(null, user) : done(null, null)
    }
}