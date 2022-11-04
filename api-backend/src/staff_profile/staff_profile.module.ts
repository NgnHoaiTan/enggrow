import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StaffProfile } from './staff_profile.entity';
import { StaffProfileService } from './staff_profile.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([StaffProfile])
  ],
  exports: [TypeOrmModule],
  providers: [StaffProfileService]
})
export class StaffProfileModule { }
