import { Test, TestingModule } from '@nestjs/testing';
import { WordAssessmentController } from './word_assessment.controller';

describe('WordAssessmentController', () => {
  let controller: WordAssessmentController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [WordAssessmentController],
    }).compile();

    controller = module.get<WordAssessmentController>(WordAssessmentController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
