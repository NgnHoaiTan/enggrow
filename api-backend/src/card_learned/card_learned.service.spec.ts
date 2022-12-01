import { Test, TestingModule } from '@nestjs/testing';
import { CardLearnedService } from './card_learned.service';

describe('CardLearnedService', () => {
  let service: CardLearnedService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CardLearnedService],
    }).compile();

    service = module.get<CardLearnedService>(CardLearnedService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
