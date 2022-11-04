import { IsNotEmpty } from "class-validator";


export class updateCourseDto {
    @IsNotEmpty()
    name: string;

    @IsNotEmpty()
    description: string;

    @IsNotEmpty()
    level:string;
    
    @IsNotEmpty()
    poster: any
}