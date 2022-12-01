import { HttpException, Injectable} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ResultPronunciationExerciseService } from 'src/result_pronunciation_exercise/result_pronunciation_exercise.service';
import { Repository } from 'typeorm';
import { PhoneAssessment } from './phone_assessment.entity';
@Injectable()
export class PhoneAssessmentService {
    constructor(
        @InjectRepository(PhoneAssessment)
        private assessmentRepository: Repository<PhoneAssessment>,
        
    ){}

    async createAssessment(data: any) {
        try{
            const createData = {
                label_ipa: data.label_ipa,
                score: data.score,
                word_assessment: data.word_assessment_id

            }
            const results = await this.assessmentRepository.save(createData)
            return results
        }catch(error){
            if (!error.status) {
                throw new Error(error)
            }
            throw new HttpException(error.message, error.status)
        }
    }
}
