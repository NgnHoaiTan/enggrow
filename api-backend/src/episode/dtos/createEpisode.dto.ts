import { IsNotEmpty, IsNumber } from "class-validator";

export class createEpisodeDto {
    @IsNotEmpty()
    name: string
    
    @IsNotEmpty()
    description: string

    @IsNotEmpty()
    @IsNumber()
    courseId: number

    video?: any
}