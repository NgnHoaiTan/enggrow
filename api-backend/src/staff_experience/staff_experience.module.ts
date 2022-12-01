import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StaffProfileModule } from 'src/staff_profile/staff_profile.module';
import { StaffExperienceController } from './staff_experience.controller';
import { StaffExperience } from './staff_experience.entity';
import { StaffExperienceService } from './staff_experience.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([StaffExperience]),
    StaffProfileModule
  ],
  exports: [TypeOrmModule],
  controllers: [StaffExperienceController],
  providers: [StaffExperienceService]
})
export class StaffExperienceModule { }
