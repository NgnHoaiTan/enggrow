import { Test, TestingModule } from '@nestjs/testing';
import { StaffExperienceController } from './staff_experience.controller';

describe('StaffExperienceController', () => {
  let controller: StaffExperienceController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [StaffExperienceController],
    }).compile();

    controller = module.get<StaffExperienceController>(StaffExperienceController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
