import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EpisodeModule } from '../episode/episode.module';
import { IdentificationExerciseController } from './identification_exercise.controller';
import { IdentificationExercise } from './identification_exercise.entity';
import { IdentificationExerciseService } from './identification_exercise.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([IdentificationExercise]),
    EpisodeModule
  ],
  exports:[TypeOrmModule],
  providers:[IdentificationExerciseService],
  controllers: [IdentificationExerciseController]
})
export class IdentificationExerciseModule {}
