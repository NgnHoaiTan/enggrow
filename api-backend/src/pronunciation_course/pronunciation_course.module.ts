import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EpisodeModule } from 'src/episode/episode.module';
import { UserModule } from 'src/user/user.module';
import { UserService } from 'src/user/user.service';
import { PronunciationCourseController } from './pronunciation_course.controller';
import { PronunciationCourse } from './pronunciation_course.entity';
import { PronunciationCourseService } from './pronunciation_course.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([PronunciationCourse]),
    UserModule
  ],
  exports:[TypeOrmModule, PronunciationCourseService],
  controllers: [PronunciationCourseController],
  providers: [PronunciationCourseService]
})
export class PronunciationCourseModule {}
