import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FlashcardModule } from 'src/flashcard/flashcard.module';
import { FolderFlashcardModule } from 'src/folder_flashcard/folder_flashcard.module';
import { UserModule } from 'src/user/user.module';
import { NotificationController } from './notification.controller';
import { Notification } from './notification.entity';
import { NotificationService } from './notification.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Notification]),
    UserModule,
    FolderFlashcardModule,
    FlashcardModule
  ],
  exports:[TypeOrmModule],
  controllers: [NotificationController],
  providers: [NotificationService]
})
export class NotificationModule {}
