import { Injectable, HttpException, BadRequestException} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { StaffProfileService } from 'src/staff_profile/staff_profile.service';
import { Repository } from 'typeorm';
import { createExperienceDto } from './dtos/createData.dto';
import { updateExperienceDto } from './dtos/updateData.dto';
import { StaffExperience } from './staff_experience.entity';

@Injectable()
export class StaffExperienceService {
    constructor(
        @InjectRepository(StaffExperience)
        private staffExperienceRepository: Repository<StaffExperience>,
        private profileService: StaffProfileService
    ){}

    async getExperienceById(id: number) {
        try {
            const experience = await this.staffExperienceRepository.findOneBy({id})
            return experience
        } catch (error) {
            if (!error.status) {
                throw new Error(error)
            }
            throw new HttpException(error.message, error.status)
        } 
    }

    async getExperienceByProfile(profileId: number){
        try {
            const experiences = await this.staffExperienceRepository.createQueryBuilder('staff_experience')
                .leftJoin('staff_experience.staff_profile', 'staff_profile')
                .where('staff_profile.id = :profileId',{profileId})
                .getMany()
            return experiences
        } catch (error) {
            if (!error.status) {
                throw new Error(error)
            }
            throw new HttpException(error.message, error.status)
        } 
    }

    async createExperience(data: any) {
        try {
            const profile = await this.profileService.getProfileById(data.profileId)
            if(profile) {
                let dataExperience: createExperienceDto = {
                    position: data.position,
                    description: data.description,
                    from_time: data.from_time,
                    to_time: data.to_time,
                    staff_profile: profile
                }
                const newExperience = await this.staffExperienceRepository.save(dataExperience)
                return newExperience
            } else {
                throw new BadRequestException('profile is invalid')
            }
            
        } catch (error) {
            if (!error.status) {
                throw new Error(error)
            }
            throw new HttpException(error.message, error.status)
        } 
    }

    async updateExperience(data: any, id: number) {
        try {
            const profile = await this.profileService.getProfileById(data.profileId)
            if(profile) {
                let dataExperience: updateExperienceDto = {
                    position: data.position,
                    description: data.description,
                    from_time: data.from_time,
                    to_time: data.to_time,
                }
                const newExperience = await this.staffExperienceRepository.update({id},dataExperience)
                return newExperience
            } else {
                throw new BadRequestException('profile is invalid')
            }
            
        } catch (error) {
            if (!error.status) {
                throw new Error(error)
            }
            throw new HttpException(error.message, error.status)
        } 
    }

    async deleteExperience(id: number) {
        try {
            return await this.staffExperienceRepository.delete({id})
            
        } catch (error) {
            if (!error.status) {
                throw new Error(error)
            }
            throw new HttpException(error.message, error.status)
        } 
    }
}
