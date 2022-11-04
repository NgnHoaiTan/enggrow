import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ExerciseModule } from 'src/exercise/exercise.module';
import { PronunciationCourseModule } from 'src/pronunciation_course/pronunciation_course.module';
import { EpisodeController } from './episode.controller';
import { Episode } from './episode.entity';
import { EpisodeService } from './episode.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Episode]),
    PronunciationCourseModule
  ],
  exports:[TypeOrmModule, EpisodeService],
  controllers: [EpisodeController],
  providers: [EpisodeService]
})
export class EpisodeModule {}
