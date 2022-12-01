import { Test, TestingModule } from '@nestjs/testing';
import { ParticipantInCourseService } from './participant_in_course.service';

describe('ParticipantInCourseService', () => {
  let service: ParticipantInCourseService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ParticipantInCourseService],
    }).compile();

    service = module.get<ParticipantInCourseService>(ParticipantInCourseService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
