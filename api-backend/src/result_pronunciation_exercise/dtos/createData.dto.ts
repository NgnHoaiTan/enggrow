import { IsNotEmpty, IsNumber } from "class-validator";

export class createDataDto {
    @IsNotEmpty()
    pronounce_file: any

    @IsNotEmpty()
    score_gain:number

    @IsNotEmpty()
    @IsNumber()
    exerciseId: number

    @IsNotEmpty()
    @IsNumber()
    userId: number
}