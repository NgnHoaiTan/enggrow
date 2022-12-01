import { Test, TestingModule } from '@nestjs/testing';
import { ResultPronunciationExerciseController } from './result_pronunciation_exercise.controller';

describe('ResultPronunciationExerciseController', () => {
  let controller: ResultPronunciationExerciseController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ResultPronunciationExerciseController],
    }).compile();

    controller = module.get<ResultPronunciationExerciseController>(ResultPronunciationExerciseController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
