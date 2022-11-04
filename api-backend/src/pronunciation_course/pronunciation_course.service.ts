import { HttpException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserService } from 'src/user/user.service';
import { Repository } from 'typeorm';
import { createCourseDto } from './dtos/createCourse.dto';
import { updateCourseDto } from './dtos/updateCourse.dto';
import { PronunciationCourse } from './pronunciation_course.entity';

@Injectable()
export class PronunciationCourseService {
    constructor(
        @InjectRepository(PronunciationCourse)
        private courseRepository: Repository<PronunciationCourse>,
        private userService: UserService
    ) { }
    async getAllCourse(query: any) {
        try {
            const querySQL = await this.courseRepository.createQueryBuilder('pronunciation_course')
            if (query.name) {
                querySQL.where('pronunciation_course.name like :name', { name: `%${query.name}%` })
            }
            const courses = querySQL.getMany()
            return courses
        } catch (error) {
            if (!error.status) {
                throw new Error(error)
            }
            throw new HttpException(error.message, error.status)
        }
    }

    async getNewCourse() {
        try {
            const courses = await this.courseRepository.createQueryBuilder('pronunciation_course')
                .limit(3)
                .orderBy('pronunciation_course.created_at', 'DESC')
                .getMany()
            return courses
        } catch (error) {
            if (!error.status) {
                throw new Error(error)
            }
            throw new HttpException(error.message, error.status)
        }
    }
    async getCourseById(id: number) {
        try {
            const course = await this.courseRepository.createQueryBuilder('pronunciation_course')
                .leftJoinAndSelect('pronunciation_course.episode','episode')
                .leftJoinAndSelect('episode.exercises','exercises')
                .where('pronunciation_course.id = :id', { id })
                .getOne()
            return course
        } catch (error) {
            if (!error.status) {
                throw new Error(error)
            }
            throw new HttpException(error.message, error.status)
        }
    }
    async createCourse(data: createCourseDto) {
        try {
            console.log(data.poster)
            const creator = await this.userService.findUserById(data.creatorId)
            if (creator) {
                const courseData = {
                    name: data.name,
                    description: data.description,
                    level: data.level,
                    creator: creator,
                    poster: data.poster ? data.poster.secure_url : null,
                    poster_id: data.poster ? data.poster.public_id : null
                }
                const newCourse = await this.courseRepository.save(courseData)
                return newCourse
            } else {
                throw new NotFoundException('creator is invalid')
            }

        } catch (error) {
            if (!error.status) {
                throw new Error(error)
            }
            throw new HttpException(error.message, error.status)
        }
    }
    async updateCourse(data: updateCourseDto, id: number) {
        try {
            const courseData = {
                name: data.name,
                description: data.description,
                level: data.level,
                poster: data.poster ? data.poster.secure_url : null,
                poster_id: data.poster ? data.poster.public_id : null
            }
            const newCourse = await this.courseRepository.update({ id }, courseData)
            return newCourse

        } catch (error) {
            if (!error.status) {
                throw new Error(error)
            }
            throw new HttpException(error.message, error.status)
        }
    }
    async deleteCourse(id: number) {
        try {
            const result = await this.courseRepository.delete({ id })
            return result

        } catch (error) {
            if (!error.status) {
                throw new Error(error)
            }
            throw new HttpException(error.message, error.status)
        }
    }
}
