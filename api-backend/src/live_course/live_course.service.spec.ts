import { Test, TestingModule } from '@nestjs/testing';
import { LiveCourseService } from './live_course.service';

describe('LiveCourseService', () => {
  let service: LiveCourseService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [LiveCourseService],
    }).compile();

    service = module.get<LiveCourseService>(LiveCourseService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
