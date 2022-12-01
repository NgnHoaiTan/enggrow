import { IsNotEmpty, IsNumber } from "class-validator";

export class createExerciseDto {
    @IsNotEmpty()
    phrase: string

    meaning?:string

    @IsNotEmpty()
    @IsNumber()
    episodeId: number
}