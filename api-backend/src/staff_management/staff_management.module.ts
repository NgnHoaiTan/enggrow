import { Module } from '@nestjs/common';
import { StaffManagementService } from './staff_management.service';
import { StaffManagementController } from './staff_management.controller';
import { UserModule } from 'src/user/user.module';
import { RoleModule } from 'src/role/role.module';

@Module({
  imports:[UserModule, RoleModule],
  providers: [StaffManagementService],
  controllers: [StaffManagementController]
})
export class StaffManagementModule {}
