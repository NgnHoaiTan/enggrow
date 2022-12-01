import { Injectable, HttpException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PhoneAssessmentService } from 'src/phone_assessment/phone_assessment.service';
import { Repository } from 'typeorm';
import { WordAssessment } from './word_assessment.entity';

@Injectable()
export class WordAssessmentService {
    constructor(
        @InjectRepository(WordAssessment)
        private wordAssessmentRepository: Repository<WordAssessment>,
        // private phoneAssessmentService: PhoneAssessmentService
    ){}

    async createWordAssessment(data: any) {
        try{
            const createData = {
                label: data.label,
                score: data.score,
                result_pronunciation: data.result_pronunciation_id
            }
            const word_assessment = await this.wordAssessmentRepository.save(createData)
            return word_assessment
        }catch(error){
            if (!error.status) {
                throw new Error(error)
            }
            throw new HttpException(error.message, error.status)
        }
    }
}
