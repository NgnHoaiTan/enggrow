import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ReelsController } from './reels.controller';
import { Reels } from './reels.entity';
import { ReelsService } from './reels.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Reels])
  ],
  exports: [TypeOrmModule],
  controllers: [ReelsController],
  providers: [ReelsService]
})
export class ReelsModule { }
