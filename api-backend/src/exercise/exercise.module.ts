import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EpisodeModule } from 'src/episode/episode.module';
import { ExerciseController } from './exercise.controller';
import { Exercise } from './exercise.entity';
import { ExerciseService } from './exercise.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Exercise]),
    EpisodeModule
  ],
  exports:[TypeOrmModule],
  providers:[ExerciseService],
  controllers: [ExerciseController]
})
export class ExerciseModule {}
