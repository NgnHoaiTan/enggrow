import { Injectable, HttpException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { StaffProfile } from './staff_profile.entity';

@Injectable()
export class StaffProfileService {
    constructor(
        @InjectRepository(StaffProfile)
        private profileRepository: Repository<StaffProfile>
    ){}

    async getProfileById(id: number) {
        try {
            const profile = await this.profileRepository.findOneBy({id})
            return profile
        }catch (error) {
            if (!error.status) {
                throw new Error(error)
            }
            throw new HttpException(error.message, error.status)
        }
    }
    async createProfile(data: any) {
        try {
            let dataProfile= {
                certification_url: data.certification.secure_url,
                certification_id: data.certification.public_id,
                introduction: data.introduction
            }
            const newProfile = await this.profileRepository.save(dataProfile)
            return newProfile
        } catch (error) {
            if (!error.status) {
                throw new Error(error)
            }
            throw new HttpException(error.message, error.status)
        }
    }
    async updateProfile(data: any, profileId: number) {
        try {
            let oldProfile = await this.getProfileById(profileId)
            let dataUpdate = {
                certification_url: data.certification ? data.certification.secure_url : oldProfile.certification_url,
                certification_id: data.certification ? data.certification.public_id : oldProfile.certification_id,
                introduction: data.introduction ? data.introduction : oldProfile.introduction
            }
            const newProfile = await this.profileRepository.update({id: profileId},dataUpdate)
            return newProfile
        } catch (error) {
            if (!error.status) {
                throw new Error(error)
            }
            throw new HttpException(error.message, error.status)
        }
    }

}
