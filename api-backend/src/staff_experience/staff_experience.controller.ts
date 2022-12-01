import { Body, Controller, Delete, Get, HttpStatus, BadRequestException, Param, ParseIntPipe, Post, Put, Query, Request, Res, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { StaffExperienceService } from './staff_experience.service';

@Controller('staff-experience')
export class StaffExperienceController {
    constructor(
        private readonly staffExperienceService: StaffExperienceService
    ) { }

    @UseGuards(JwtAuthGuard)
    @Get('profile/:profileId')
    async getExperienceByProfile(@Request() req, @Res() response, @Param('profileId', ParseIntPipe) profileId: number) {
        try {
            const experiences = await this.staffExperienceService.getExperienceByProfile(profileId)
            return response.status(200).json(experiences)
        } catch (error) {
            if (!error.status) {
                throw new Error(error)
            }
            return response.status(error.status).json(error)
        }
    }

    @UseGuards(JwtAuthGuard)
    @Post('')
    async createExperience(@Request() req, @Res() response, @Body() data: any) {
        try {
            let dataExperience = {
                position: data.position,
                description: data.description,
                from_time: data.from_time,
                to_time: data.to_time,
                profileId: data.profileId
            }
            const experience = await this.staffExperienceService.createExperience(dataExperience)
            return response.status(200).json(experience)
        } catch (error) {
            if (!error.status) {
                throw new Error(error)
            }
            return response.status(error.status).json(error)
        }
    }

    @UseGuards(JwtAuthGuard)
    @Put(':id')
    async updateExperience(@Request() req, @Res() response, @Param('id',ParseIntPipe) id: number, @Body() data: any) {
        try {
            let dataExperience = {
                position: data.position,
                description: data.description,
                from_time: data.from_time,
                to_time: data.to_time,
            }
            const experience = await this.staffExperienceService.updateExperience(dataExperience, id)
            return response.status(200).json(experience)
        } catch (error) {
            if (!error.status) {
                throw new Error(error)
            }
            return response.status(error.status).json(error)
        }
    }

    @UseGuards(JwtAuthGuard)
    @Delete(':id')
    async deleteExperience(@Request() req, @Res() response, @Param('id',ParseIntPipe) id: number) {
        try {
            const experience = await this.staffExperienceService.deleteExperience(id)
            return response.status(200).json(experience)
        } catch (error) {
            if (!error.status) {
                throw new Error(error)
            }
            return response.status(error.status).json(error)
        }
    }

}
