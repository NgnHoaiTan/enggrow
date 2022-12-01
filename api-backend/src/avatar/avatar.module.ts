import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from 'src/user/user.module';
import { AvatarController } from './avatar.controller';
import { Avatar } from './avatar.entity';
import { AvatarService } from './avatar.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Avatar]),
    UserModule
  ],
  exports:[TypeOrmModule, AvatarService],
  controllers: [AvatarController],
  providers: [AvatarService]
})
export class AvatarModule {}
