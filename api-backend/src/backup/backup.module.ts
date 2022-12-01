import { Module } from '@nestjs/common';
import { BackupService } from './backup.service';
import { BackupController } from './backup.controller';

@Module({
  exports:[BackupService],
  providers: [BackupService],
  controllers: [BackupController]
})
export class BackupModule {}
