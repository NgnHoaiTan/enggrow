import { IsNotEmpty } from "class-validator";


export class createCourseDto {
    @IsNotEmpty()
    name: string;

    @IsNotEmpty()
    description: string;

    @IsNotEmpty()
    level:string;
    
    @IsNotEmpty()
    creatorId: number

    @IsNotEmpty()
    poster: any
}