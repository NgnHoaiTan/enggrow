import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FlashcardModule } from '../flashcard/flashcard.module';
import { UserModule } from '../user/user.module';
import { CardPronunciationResultController } from './card_pronunciation_result.controller';
import { CardPronunciationResult } from './card_pronunciation_result.entity';
import { CardPronunciationResultService } from './card_pronunciation_result.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([CardPronunciationResult]),
    FlashcardModule,
    UserModule
  ],
  controllers: [CardPronunciationResultController],
  providers: [CardPronunciationResultService],
  exports:[TypeOrmModule, CardPronunciationResultService]
})
export class CardPronunciationResultModule {}
