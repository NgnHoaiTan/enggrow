import { IsNotEmpty, IsNumber } from "class-validator";

export class createExerciseDto {
    @IsNotEmpty()
    true_word: string

    @IsNotEmpty()
    false_word: string

    @IsNotEmpty()
    audio: string
    
    @IsNotEmpty()
    @IsNumber()
    episodeId: number
}