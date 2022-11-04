import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LiveCourseController } from './live_course.controller';
import { LiveCourse } from './live_course.entity';
import { LiveCourseService } from './live_course.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([LiveCourse])
  ],
  exports:[TypeOrmModule],
  controllers: [LiveCourseController],
  providers: [LiveCourseService]
})
export class LiveCourseModule {}
