import { IsNotEmpty, IsNumber } from "class-validator";

export class updateEpisodeDto {
    @IsNotEmpty()
    name: string
    
    @IsNotEmpty()
    description: string

    fundamentals?: string

    video?: any
}