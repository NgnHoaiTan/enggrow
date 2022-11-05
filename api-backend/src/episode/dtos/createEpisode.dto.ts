import { IsNotEmpty, IsNumber } from "class-validator";

export class createEpisodeDto {
    @IsNotEmpty()
    name: string
    
    @IsNotEmpty()
    description: string

    fundamentals?: string

    @IsNotEmpty()
    @IsNumber()
    courseId: number

    video?: any
}