import { IsNotEmpty } from "class-validator";

export class createExperienceDto {
    @IsNotEmpty()
    position: string;

    @IsNotEmpty()
    description: string

    @IsNotEmpty()
    from_time: string

    @IsNotEmpty()
    to_time: string

    @IsNotEmpty()
    staff_profile: any
}