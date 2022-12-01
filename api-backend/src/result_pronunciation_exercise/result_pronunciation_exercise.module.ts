import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PhoneAssessmentModule } from 'src/phone_assessment/phone_assessment.module';
import { PronunciationExerciseModule } from 'src/pronunciation_exercise/pronunciation_exercise.module';
import { WordAssessmentModule } from 'src/word_assessment/word_assessment.module';
import { UserModule } from '../user/user.module';
import { ResultPronunciationExerciseController } from './result_pronunciation_exercise.controller';
import { ResultPronunciationExercise } from './result_pronunciation_exercise.entity';
import { ResultPronunciationExerciseService } from './result_pronunciation_exercise.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([ResultPronunciationExercise]),
    PronunciationExerciseModule,
    UserModule,
    forwardRef(() => WordAssessmentModule),
    forwardRef(() => PhoneAssessmentModule)
  ],
  controllers: [ResultPronunciationExerciseController],
  providers: [ResultPronunciationExerciseService],
  exports:[TypeOrmModule, ResultPronunciationExerciseService]
})
export class ResultPronunciationExerciseModule {}
