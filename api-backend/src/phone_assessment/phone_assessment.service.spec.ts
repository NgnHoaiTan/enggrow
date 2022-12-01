import { Test, TestingModule } from '@nestjs/testing';
import { PhoneAssessmentService } from './phone_assessment.service';

describe('PhoneAssessmentService', () => {
  let service: PhoneAssessmentService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PhoneAssessmentService],
    }).compile();

    service = module.get<PhoneAssessmentService>(PhoneAssessmentService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
