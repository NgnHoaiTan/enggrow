import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MemberCourse } from './member_course.entity';

@Module({
    imports: [
        TypeOrmModule.forFeature([MemberCourse])
    ],
    exports: [TypeOrmModule],
})
export class MemberCourseModule { }
