import { Test, TestingModule } from '@nestjs/testing';
import { PhoneAssessmentController } from './phone_assessment.controller';

describe('PhoneAssessmentController', () => {
  let controller: PhoneAssessmentController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PhoneAssessmentController],
    }).compile();

    controller = module.get<PhoneAssessmentController>(PhoneAssessmentController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
