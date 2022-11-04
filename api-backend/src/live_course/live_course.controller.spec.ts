import { Test, TestingModule } from '@nestjs/testing';
import { LiveCourseController } from './live_course.controller';

describe('LiveCourseController', () => {
  let controller: LiveCourseController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [LiveCourseController],
    }).compile();

    controller = module.get<LiveCourseController>(LiveCourseController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
