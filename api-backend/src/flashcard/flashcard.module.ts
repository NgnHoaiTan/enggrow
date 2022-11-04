import { Module } from '@nestjs/common';
import { FlashcardService } from './flashcard.service';
import { FlashcardController } from './flashcard.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Flashcard } from './flashcard.entity';
import { FolderFlashcardModule } from 'src/folder_flashcard/folder_flashcard.module';
import { UserModule } from 'src/user/user.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Flashcard]),
    FolderFlashcardModule,
    UserModule
  ],
  providers: [FlashcardService],
  controllers: [FlashcardController],
  exports:[TypeOrmModule]
})
export class FlashcardModule {}
