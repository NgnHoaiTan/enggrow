import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FlashcardModule } from '../flashcard/flashcard.module';
import { UserModule } from '../user/user.module';
import { CardLearnedController } from './card_learned.controller';
import { CardLearned } from './card_learned.entity';
import { CardLearnedService } from './card_learned.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([CardLearned]),
    FlashcardModule,
    UserModule
  ],
  controllers: [CardLearnedController],
  providers: [CardLearnedService],
  exports:[TypeOrmModule, CardLearnedService]
})
export class CardLearnedModule {}
