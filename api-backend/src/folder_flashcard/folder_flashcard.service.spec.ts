import { Test, TestingModule } from '@nestjs/testing';
import { FolderFlashcardService } from './folder_flashcard.service';

describe('FolderFlashcardService', () => {
  let service: FolderFlashcardService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FolderFlashcardService],
    }).compile();

    service = module.get<FolderFlashcardService>(FolderFlashcardService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
