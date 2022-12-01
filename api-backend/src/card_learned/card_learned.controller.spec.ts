import { Test, TestingModule } from '@nestjs/testing';
import { CardLearnedController } from './card_learned.controller';

describe('CardLearnedController', () => {
  let controller: CardLearnedController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CardLearnedController],
    }).compile();

    controller = module.get<CardLearnedController>(CardLearnedController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
