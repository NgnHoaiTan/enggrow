import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PronunciationCourseModule } from '../pronunciation_course/pronunciation_course.module';
import { UserModule } from '../user/user.module';
import { ParticipantInCourseController } from './participant_in_course.controller';
import { ParticipantInCourse } from './participant_in_course.entity';
import { ParticipantInCourseService } from './participant_in_course.service';

@Module({
  imports:[TypeOrmModule.forFeature([ParticipantInCourse]),
    UserModule,
    PronunciationCourseModule
  ],
  exports:[TypeOrmModule],
  controllers: [ParticipantInCourseController],
  providers: [ParticipantInCourseService]
})
export class ParticipantInCourseModule {}
