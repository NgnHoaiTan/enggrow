import { IsNotEmpty, IsNumber } from "class-validator";

export class updateExerciseDto {
    @IsNotEmpty()
    phrase: string
    

}