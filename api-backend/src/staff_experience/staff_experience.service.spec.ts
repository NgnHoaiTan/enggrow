import { Test, TestingModule } from '@nestjs/testing';
import { StaffExperienceService } from './staff_experience.service';

describe('StaffExperienceService', () => {
  let service: StaffExperienceService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [StaffExperienceService],
    }).compile();

    service = module.get<StaffExperienceService>(StaffExperienceService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
