import { Module } from '@nestjs/common';
import { UserManagementService } from './user_management.service';
import { UserManagementController } from './user_management.controller';
import { UserModule } from 'src/user/user.module';

@Module({
  imports:[UserModule],
  providers: [UserManagementService],
  controllers: [UserManagementController]
})
export class UserManagementModule {}
