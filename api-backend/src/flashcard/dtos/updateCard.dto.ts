import { IsNotEmpty } from "class-validator";


export class updateCardDto {
    @IsNotEmpty()
    term?: string;

    meaning?: string;

}