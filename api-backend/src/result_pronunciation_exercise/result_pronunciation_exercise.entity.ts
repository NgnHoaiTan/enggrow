import { PhoneAssessment } from "../phone_assessment/phone_assessment.entity";
import { Column, CreateDateColumn, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { User } from "../user/user.entity";
import { PronunciationExercise } from "../pronunciation_exercise/pronunciation_exercise.entity";
import { WordAssessment } from "../word_assessment/word_assessment.entity";

@Entity()
export class ResultPronunciationExercise {
    @PrimaryGeneratedColumn()
    id: number

    @Column({nullable:false, length:100})
    pronounce_url: string

    @Column({nullable:false, length:30})
    pronounce_id: string

    @Column({nullable:false})
    score_gain: number

    @CreateDateColumn()
    created_at: Date;

    @OneToMany(()=>WordAssessment, (assessment) => assessment.result_pronunciation)
    word_assessment: WordAssessment[]

    @ManyToOne(()=>PronunciationExercise, (exercise) => exercise.result_pronunciation,{nullable:false, onDelete:'CASCADE'})
    exercise: PronunciationExercise

    @ManyToOne(()=>User, (user) => user.result_pronunciation_exercise,{nullable:false, onDelete:'CASCADE'})
    user: User
}