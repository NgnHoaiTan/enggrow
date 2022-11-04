import { Module } from '@nestjs/common';
import { AchievementService } from './achievement.service';
import { AchievementController } from './achievement.controller';
import { Achievement } from './achievement.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forFeature([Achievement])
  ],
  exports: [TypeOrmModule],
  providers: [AchievementService],
  controllers: [AchievementController]
})
export class AchievementModule { }
