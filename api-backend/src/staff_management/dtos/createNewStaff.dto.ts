import { IsNotEmpty } from "class-validator";

export class createNewStaffDto {
    @IsNotEmpty()
    name: string;


    @IsNotEmpty()
    username: string

    @IsNotEmpty()
    password: string

    @IsNotEmpty()
    current_avatar: string
}