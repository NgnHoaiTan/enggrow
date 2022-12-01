import { ResultPronunciationExercise } from "../result_pronunciation_exercise/result_pronunciation_exercise.entity";
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { PhoneAssessment } from "../phone_assessment/phone_assessment.entity";

@Entity()
export class WordAssessment {
    @PrimaryGeneratedColumn()
    id: number

    @Column('varchar',{nullable:false, length:5})
    label: string

    @Column({nullable:false})
    score: number

    @ManyToOne(()=>ResultPronunciationExercise, (result)=>result.word_assessment,{onDelete:'CASCADE'})
    @JoinColumn({ name: "result_pronunciation_id" })
    result_pronunciation: ResultPronunciationExercise

    @OneToMany(()=>PhoneAssessment, (phone_assessment)=>phone_assessment.word_assessment,{nullable:false})
    phone_assessment: PhoneAssessment[]
}