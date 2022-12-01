import { Test, TestingModule } from '@nestjs/testing';
import { CardPronunciationResultService } from './card_pronunciation_result.service';

describe('CardPronunciationResultService', () => {
  let service: CardPronunciationResultService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CardPronunciationResultService],
    }).compile();

    service = module.get<CardPronunciationResultService>(CardPronunciationResultService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
