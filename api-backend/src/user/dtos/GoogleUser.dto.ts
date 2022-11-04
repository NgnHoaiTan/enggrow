import { IsNotEmpty, IsEmail } from "class-validator";
import { LoginUserDto } from "./LoginUser.dto";

export class GoogleUserDto {
    @IsNotEmpty()
    @IsEmail()
    email: string;

    @IsNotEmpty()
    email_verified: boolean;

    @IsNotEmpty()
    googleId: string;

    @IsNotEmpty()
    name: string;

    @IsNotEmpty()
    picture: string;
}