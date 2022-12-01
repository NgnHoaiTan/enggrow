import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PhoneAssessmentModule } from 'src/phone_assessment/phone_assessment.module';
import { PronunciationExerciseModule } from 'src/pronunciation_exercise/pronunciation_exercise.module';
import { WordAssessmentController } from './word_assessment.controller';
import { WordAssessment } from './word_assessment.entity';
import { WordAssessmentService } from './word_assessment.service';

@Module({
  imports:[TypeOrmModule.forFeature([WordAssessment]),
    PronunciationExerciseModule,
    
  ],
  controllers: [WordAssessmentController],
  providers: [WordAssessmentService],
  exports:[TypeOrmModule, WordAssessmentService]
})
export class WordAssessmentModule {}
