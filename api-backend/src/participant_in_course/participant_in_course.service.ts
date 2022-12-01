import { Injectable, HttpException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PronunciationCourseService } from '../pronunciation_course/pronunciation_course.service';
import { UserService } from '../user/user.service';
import { Repository } from 'typeorm';
import { ParticipantInCourse } from './participant_in_course.entity';

@Injectable()
export class ParticipantInCourseService {
    constructor(
        @InjectRepository(ParticipantInCourse)
        private participantRepository: Repository<ParticipantInCourse>,
        private userService: UserService,
        private courseService: PronunciationCourseService
    ) { }

    async getAllParticipants() {
        try {
            const participants = await this.participantRepository.createQueryBuilder('participant_in_course')  
                .leftJoinAndSelect('participant_in_course.course', 'pronunciation_course')
                .getMany()
            return participants
        } catch (error) {
            if (!error.status) {
                throw new Error(error)
            }
            throw new HttpException(error.message, error.status)
        }
    }


    async getAllParticipantsByCourse(courseId: number) {
        try {
            const participants = await this.participantRepository.createQueryBuilder('participant_in_course')
                .leftJoin('participant_in_course.participant','user')
                .addSelect('user.id')
                .addSelect('user.name')
                .addSelect('user.current_avatar')
                .where('participant_in_course.courseId = :courseId', { courseId })
                .getMany()
            return participants
        } catch (error) {
            if (!error.status) {
                throw new Error(error)
            }
            throw new HttpException(error.message, error.status)
        }
    }

    async getAllParticipantsByUser(userId: number) {
        try {
            const participants = await this.participantRepository.createQueryBuilder('participant_in_course')
                .leftJoinAndSelect('participant_in_course.course', 'pronunciation_course')
                .where('participant_in_course.participantId = :userId', { userId })
                .getMany()
            return participants
        } catch (error) {
            if (!error.status) {
                throw new Error(error)
            }
            throw new HttpException(error.message, error.status)
        }
    }
    async checkRegister(courseId: number, userId: number) {
        try {
            const participants = await this.participantRepository.createQueryBuilder('participant_in_course')
                .where('participant_in_course.participantId = :userId', { userId })
                .andWhere('participant_in_course.courseId = :courseId', { courseId })
                .getOne()
            return participants
        } catch (error) {
            if (!error.status) {
                throw new Error(error)
            }
            throw new HttpException(error.message, error.status)
        }
    }
    async StatisticRecentRegister() {
        try {
            let date = new Date()
            const participants = await this.participantRepository.createQueryBuilder('participant_in_course')
                .leftJoinAndSelect('participant_in_course.participant', 'user')
                .where('participant_in_course.created_at > :fromdate', { fromdate: new Date(date.setDate(date.getDate() - 3)).toISOString() })
                .orderBy('participant_in_course.created_at', 'DESC')
                .getMany()
            return participants
        } catch (error) {
            if (!error.status) {
                throw new Error(error)
            }
            throw new HttpException(error.message, error.status)
        }
    }

    async registerParticipant(data: any) {
        try {
            let participant = await this.userService.findUserById(data.userId)
            let course = await this.courseService.getCourseById(data.courseId)
            let checkParticipant = await this.checkRegister(data.userId, data.courseId)
            if (!checkParticipant) {
                const participantData = {
                    participant: participant,
                    course: course
                }
                const participants = await this.participantRepository.save(participantData)
                return participants
            } else {
                throw new HttpException('You are in this course', 400)
            }

        } catch (error) {
            if (!error.status) {
                throw new Error(error)
            }
            throw new HttpException(error.message, error.status)
        }
    }
}
