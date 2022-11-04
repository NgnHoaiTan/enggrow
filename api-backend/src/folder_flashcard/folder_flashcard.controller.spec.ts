import { Test, TestingModule } from '@nestjs/testing';
import { FolderFlashcardController } from './folder_flashcard.controller';

describe('FolderFlashcardController', () => {
  let controller: FolderFlashcardController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FolderFlashcardController],
    }).compile();

    controller = module.get<FolderFlashcardController>(FolderFlashcardController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
