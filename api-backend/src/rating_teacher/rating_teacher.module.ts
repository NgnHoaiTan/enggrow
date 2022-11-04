import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RatingTeacher } from './rating_teacher.entity';

@Module({
    imports: [
        TypeOrmModule.forFeature([RatingTeacher])
    ],
    exports: [TypeOrmModule],
})
export class RatingTeacherModule {}
