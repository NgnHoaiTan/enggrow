import { IsNotEmpty } from "class-validator";
import { LoginUserDto } from "./LoginUser.dto";

export class CreateUserDto extends LoginUserDto {
    @IsNotEmpty()
    name: string;

    @IsNotEmpty()
    phone_number: string;

    @IsNotEmpty()
    username: string

    @IsNotEmpty()
    password: string
}