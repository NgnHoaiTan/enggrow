import { IsNotEmpty, IsNumber } from "class-validator";

export class createExerciseDto {
    @IsNotEmpty()
    phrase: string
    

    @IsNotEmpty()
    @IsNumber()
    episodeId: number
}