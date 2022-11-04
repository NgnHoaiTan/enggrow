import { HttpException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PronunciationCourseService } from 'src/pronunciation_course/pronunciation_course.service';
import { Repository } from 'typeorm';
import { createEpisodeDto } from './dtos/createEpisode.dto';
import { updateEpisodeDto } from './dtos/updateEpisode.dto';
import { Episode } from './episode.entity';

@Injectable()
export class EpisodeService {
    constructor(
        @InjectRepository(Episode)
        private episodeRepository: Repository<Episode>,
        private courseSerive: PronunciationCourseService
    ) { }

    async getByCourse(courseId: number, query) {
        try {

            const querySQL = await this.episodeRepository.createQueryBuilder('episode')
                .where('episode.pronunciationCourseId = :courseId', { courseId })
            if (query.name) {
                querySQL.andWhere('episode.name like :name', { name: `%${query.name}%` })
            }
            const episodes = await querySQL.getMany()
            return episodes
        } catch (error) {
            if (!error.status) {
                throw new Error(error)
            }
            throw new HttpException(error.message, error.status)
        }
    }

    async getEpisodeById(id: number) {
        try {
            const episode = await this.episodeRepository.createQueryBuilder('episode')
                .leftJoinAndSelect('episode.pronunciation_course', 'pronunciation_course')
                .where('episode.id = :id', { id })
                .getOne()
            return episode
        } catch (error) {
            if (!error.status) {
                throw new Error(error)
            }
            throw new HttpException(error.message, error.status)
        }
    }
    async createEpisode(data: createEpisodeDto) {
        try {
            const course = await this.courseSerive.getCourseById(data.courseId)
            if (course) {
                const episodeData = {
                    name: data.name,
                    description: data.description,
                    pronunciation_course: course,
                    video_url: data.video.path,
                    video_file_name: data.video.filename
                }
                const newExercise = await this.episodeRepository.save(episodeData)
                return newExercise
            } else {
                throw new NotFoundException('course is invalid')
            }

        } catch (error) {
            if (!error.status) {
                throw new Error(error)
            }
            throw new HttpException(error.message, error.status)
        }
    }
    async updateEpisode(data: updateEpisodeDto, id: number) {
        try {
            const oldEpisode = await this.getEpisodeById(id)
            const episodeData = {
                name: data.name,
                description: data.description,
                video_url: data.video ? data.video.path : oldEpisode.video_url,
                video_file_name: data.video ? data.video.filename : oldEpisode.video_file_name
            }
            const newEpisode = await this.episodeRepository.update({ id }, episodeData)
            return newEpisode

        } catch (error) {
            if (!error.status) {
                throw new Error(error)
            }
            throw new HttpException(error.message, error.status)
        }
    }
    async deleteEpisode(id: number) {
        try {
            const result = await this.episodeRepository.delete({ id })
            return result

        } catch (error) {
            if (!error.status) {
                throw new Error(error)
            }
            throw new HttpException(error.message, error.status)
        }
    }
}
