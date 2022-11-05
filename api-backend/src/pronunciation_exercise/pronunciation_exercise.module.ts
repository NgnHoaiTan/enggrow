import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EpisodeModule } from 'src/episode/episode.module';
import { PronunciationExerciseController } from './pronunciation_exercise.controller';
import { PronunciationExercise } from './pronunciation_exercise.entity';
import { PronunciationExerciseService } from './pronunciation_exercise.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([PronunciationExercise]),
    EpisodeModule
  ],
  exports:[TypeOrmModule],
  providers:[PronunciationExerciseService],
  controllers: [PronunciationExerciseController]
})
export class PronunciationExerciseModule {}
