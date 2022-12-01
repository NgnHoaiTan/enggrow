import { Test, TestingModule } from '@nestjs/testing';
import { CardPronunciationResultController } from './card_pronunciation_result.controller';

describe('CardPronunciationResultController', () => {
  let controller: CardPronunciationResultController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CardPronunciationResultController],
    }).compile();

    controller = module.get<CardPronunciationResultController>(CardPronunciationResultController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
