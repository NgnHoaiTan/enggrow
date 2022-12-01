import { Test, TestingModule } from '@nestjs/testing';
import { ParticipantInCourseController } from './participant_in_course.controller';

describe('ParticipantInCourseController', () => {
  let controller: ParticipantInCourseController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ParticipantInCourseController],
    }).compile();

    controller = module.get<ParticipantInCourseController>(ParticipantInCourseController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
