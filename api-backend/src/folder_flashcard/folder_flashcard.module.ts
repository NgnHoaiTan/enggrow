import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from 'src/user/user.module';
import { FolderFlashcardController } from './folder_flashcard.controller';
import { FolderFlashcard } from './folder_flashcard.entity';
import { FolderFlashcardService } from './folder_flashcard.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([FolderFlashcard]),
    UserModule
  ],
  controllers: [FolderFlashcardController],
  providers: [FolderFlashcardService],
  exports:[TypeOrmModule, FolderFlashcardService]
})
export class FolderFlashcardModule {}
