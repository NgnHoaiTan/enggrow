import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from 'src/user/user.module';
import { StaffProfileController } from './staff_profile.controller';
import { StaffProfile } from './staff_profile.entity';
import { StaffProfileService } from './staff_profile.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([StaffProfile]),
    UserModule
  ],
  exports: [TypeOrmModule, StaffProfileService],
  controllers:[StaffProfileController],
  providers: [StaffProfileService]
})
export class StaffProfileModule { }
