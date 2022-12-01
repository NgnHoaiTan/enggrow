import { IsNotEmpty } from "class-validator";

export class updateExperienceDto {
    @IsNotEmpty()
    position: string;

    @IsNotEmpty()
    description: string

    @IsNotEmpty()
    from_time: string

    @IsNotEmpty()
    to_time: string
}