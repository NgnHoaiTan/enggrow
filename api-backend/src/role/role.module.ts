import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Role } from './role.entity';
import { RoleService } from './role.service';

@Module({
    imports: [
        TypeOrmModule.forFeature([Role])
    ],
    controllers:[],
    providers:[RoleService],
    exports: [TypeOrmModule, RoleService],
})
export class RoleModule {}
