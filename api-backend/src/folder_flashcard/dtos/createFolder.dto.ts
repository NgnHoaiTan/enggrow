import { IsNotEmpty } from "class-validator";
import { User } from "../../user/user.entity";


export class createFolderDto {
    @IsNotEmpty()
    name: string;

    @IsNotEmpty()
    userId: string
}