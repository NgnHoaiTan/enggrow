import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WordAssessmentModule } from 'src/word_assessment/word_assessment.module';
import { PhoneAssessmentController } from './phone_assessment.controller';
import { PhoneAssessment } from './phone_assessment.entity';
import { PhoneAssessmentService } from './phone_assessment.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([PhoneAssessment]),
    WordAssessmentModule,
  ],
  controllers: [PhoneAssessmentController],
  providers: [PhoneAssessmentService],
  exports: [TypeOrmModule, PhoneAssessmentService]
})
export class PhoneAssessmentModule {}
