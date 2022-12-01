import { Test, TestingModule } from '@nestjs/testing';
import { ResultPronunciationExerciseService } from './result_pronunciation_exercise.service';

describe('ResultPronunciationExerciseService', () => {
  let service: ResultPronunciationExerciseService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ResultPronunciationExerciseService],
    }).compile();

    service = module.get<ResultPronunciationExerciseService>(ResultPronunciationExerciseService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
