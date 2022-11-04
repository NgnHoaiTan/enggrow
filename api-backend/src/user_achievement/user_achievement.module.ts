import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserAchievement } from './user_achievement.entity';

@Module({
    imports: [
        TypeOrmModule.forFeature([UserAchievement])
    ],
    exports: [TypeOrmModule],
})
export class UserAchievementModule {}
