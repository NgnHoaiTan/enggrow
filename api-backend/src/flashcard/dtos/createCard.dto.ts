import { IsNotEmpty } from "class-validator";


export class createCardDto {
    @IsNotEmpty()
    term: string;

    meaning?: string;

    example?:string;
    
    @IsNotEmpty()
    folderId: number
}