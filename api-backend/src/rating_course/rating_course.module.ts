import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RatingCourse } from './rating_course.entity';

@Module({
    imports: [
        TypeOrmModule.forFeature([RatingCourse])
    ],
    exports: [TypeOrmModule],
})
export class RatingCourseModule { }
