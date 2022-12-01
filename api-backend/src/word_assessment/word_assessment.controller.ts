import { Controller,Get, Post, Request, Res, Body, Param } from '@nestjs/common';
import { WordAssessmentService } from './word_assessment.service';

@Controller('word-assessment')
export class WordAssessmentController {
    constructor(
        private readonly wordAssessmentService: WordAssessmentService
    ){}
    @Post('')
    async createWordAssessment(@Request() req, @Res() response, @Body() rawData: any) {
        try {

            const result = await this.wordAssessmentService.createWordAssessment(rawData)
            return response.status(200).json(result)
        } catch (error) {
            if (!error.status) {
                throw new Error(error)
            }
            return response.status(error.status).json(error)
        }
    }
}
