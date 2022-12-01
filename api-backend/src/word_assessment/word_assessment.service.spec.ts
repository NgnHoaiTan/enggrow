import { Test, TestingModule } from '@nestjs/testing';
import { WordAssessmentService } from './word_assessment.service';

describe('WordAssessmentService', () => {
  let service: WordAssessmentService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [WordAssessmentService],
    }).compile();

    service = module.get<WordAssessmentService>(WordAssessmentService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
