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
                .leftJoinAndSelect('pronunciation_course.members','participant_in_course')
                .leftJoinAndSelect('participant_in_course.participant','participant')
            if (query.name) {
                querySQL.where('pronunciation_course.name like :name', { name: `%${query.name}%` })
            }
            // if(query.interested) {
            //     querySQL
            //         .addSelect((subquery) => {
            //             return subquery
            //                 .select('COUNT(participant_in_course.id)','count_participant')
            //                 .from('participant_in_course','participant_in_course')
            //                 .where('participant_in_course.course.id = pronunciation_course.id')
            //         },'count')
            //         .orderBy('count', 'DESC')
            //         .addOrderBy('pronunciation_course.created_at', 'DESC') 
            // }
            if(query.level && query.level !== 'all') {
                querySQL.andWhere('pronunciation_course.level = :level',{level: query.level})
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
    async getMyCourses(creatorId: number, query: any) {
        try {
            const querySQL = await this.courseRepository.createQueryBuilder('pronunciation_course')
                .where('pronunciation_course.creatorId = :creatorId',{creatorId})
                .orderBy('pronunciation_course.created_at','DESC')
            if(query) {
                if(query.orderBy) {
                    querySQL.orderBy('pronunciation_course.created_at',query.order)
                }
                if(query.quantity) {
                    querySQL.limit(parseInt(query.quantity))
                }
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

    async getReviewCoursesByCreator(creatorId: number) {
        try {
            const courses = await this.courseRepository.createQueryBuilder('pronunciation_course')
                .where('pronunciation_course.creatorId = :creatorId',{creatorId})
                .orderBy('pronunciation_course.created_at')
                .limit(4)
                .getMany()
            return courses
        } catch (error) {
            if (!error.status) {
                throw new Error(error)
            }
            throw new HttpException(error.message, error.status)
        }
    }
    async getAllCoursesByCreator(creatorId: number) {
        try {
            const courses = await this.courseRepository.createQueryBuilder('pronunciation_course')
                .where('pronunciation_course.creatorId = :creatorId',{creatorId})
                .getMany()
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
                .limit(4)
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
                .leftJoin('pronunciation_course.creator','user')
                .leftJoinAndSelect('pronunciation_course.members','participant_in_course')
                .addSelect('user.name')
                .addSelect('user.id')
                // .leftJoinAndSelect('episode.exercises','exercises')
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

    async statisticLevelTrending() {
        try {
            const statistic = await this.courseRepository.createQueryBuilder('pronunciation_course')
            .leftJoin('pronunciation_course.members','participant_in_course')
            .select('pronunciation_course.id as id')
            .addSelect('pronunciation_course.level')
            .addSelect('COUNT(participant_in_course.id) as participant_quantity')
            .groupBy('pronunciation_course.level')
            .getRawMany()

            
            return statistic
        } catch (error) {
            if (!error.status) {
                throw new Error(error)
            }
            throw new HttpException(error.message, error.status)
        }
    }

    async getTopCoursesHaveMostMember() {
        try {
            const courses = await this.courseRepository.createQueryBuilder('pronunciation_course')
                .leftJoinAndSelect('pronunciation_course.members','participant_in_course')
                .leftJoinAndSelect('participant_in_course.participant','participant')
                .addSelect((subquery) => {
                    return subquery
                        .select('COUNT(participant_in_course.id)','count_participant')
                        .from('participant_in_course','participant_in_course')
                        .where('participant_in_course.course.id = pronunciation_course.id')
                },'count')
                .orderBy('count', 'DESC')
                .addOrderBy('pronunciation_course.created_at', 'DESC') 
                .take(3)
                .getMany()
            return courses
        } catch (error) {
            if (!error.status) {
                throw new Error(error)
            }
            throw new HttpException(error.message, error.status)
        }
    }
    async getTopCoursesHaveFewestMember() {
        try {
            const courses = await this.courseRepository.createQueryBuilder('pronunciation_course')
                .leftJoinAndSelect('pronunciation_course.members','participant_in_course')
                .leftJoinAndSelect('participant_in_course.participant','participant')
                .addSelect((subquery) => {
                    return subquery
                        .select('COUNT(participant_in_course.id)','count_participant')
                        .from('participant_in_course','participant_in_course')
                        .where('participant_in_course.course.id = pronunciation_course.id')
                },'count')
                .orderBy('count', 'ASC')
                .addOrderBy('pronunciation_course.created_at', 'DESC') 
                .limit(3)
                .getMany()
            return courses
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
            const oldCourse = await this.getCourseById(id)
            const courseData = {
                name: data.name,
                description: data.description,
                level: data.level,
                poster: data.poster ? data.poster.secure_url : oldCourse.poster,
                poster_id: data.poster ? data.poster.public_id : oldCourse.poster_id
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
