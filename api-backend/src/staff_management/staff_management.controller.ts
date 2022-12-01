import { Controller, Get, Post, Delete, Query, Request, Res, Body, UseGuards, Param, ParseIntPipe } from '@nestjs/common';
import { StaffManagementService } from './staff_management.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { createNewStaffDto } from './dtos/createNewStaff.dto';

@Controller('staff-management')
export class StaffManagementController {
    constructor(
        private readonly staffManagementService: StaffManagementService
    ){}

    @UseGuards(JwtAuthGuard)
    @Get('getall')
    async getAllStaffs(@Request() req, @Res() response, @Query() query) {
        try{
            const staffs = await this.staffManagementService.getAllStaffs(query)
            return response.status(200).json(staffs)
        }catch(error){
            if(!error.status){
                throw new Error(error)
            }
            return response.status(error.status).json(error)
        }
    }

    @UseGuards(JwtAuthGuard)
    @Get('staff/:id')
    async getDetailStaffById(@Request() req, @Res() response, @Param('id', ParseIntPipe) id: number) {
        try{
            const staff = await this.staffManagementService.getDetailStaffById(id)
            return response.status(200).json(staff)
        }catch(error){
            if(!error.status){
                throw new Error(error)
            }
            return response.status(error.status).json(error)
        }
    }

    @UseGuards(JwtAuthGuard)
    @Post('new-staff')
    async registerNewStaff(@Request() req, @Res() response, @Body() rawData: any) {
        try{
            let data: createNewStaffDto = {
                name: rawData.name,
                username: rawData.username,
                password: rawData.password,
                current_avatar:'https://res.cloudinary.com/hoaitan/image/upload/v1668768589/engrow/737a9051311fd6168d7b81064359b527_i3hi1b.jpg'
            }
            const staffs = await this.staffManagementService.registerNewStaff(data)
            return response.status(200).json(staffs)
        }catch(error){
            if(!error.status){
                throw new Error(error)
            }
            return response.status(error.status).json(error)
        }
    }

    @UseGuards(JwtAuthGuard)
    @Delete(':id')
    async deleteStaffs(@Request() req, @Res() response,@Param('id', ParseIntPipe) id: number ) {
        try{
            const staffs = await this.staffManagementService.deleteStaffs(id)
            return response.status(200).json(staffs)
        }catch(error){
            if(!error.status){
                throw new Error(error)
            }
            return response.status(error.status).json(error)
        }
    }
}
