
import { WordAssessment } from "../word_assessment/word_assessment.entity";
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class PhoneAssessment {
    @PrimaryGeneratedColumn()
    id: number

    @Column('varchar',{nullable:false, length:5})
    label_ipa: string

    @Column({nullable:false})
    score: number

    @ManyToOne(()=>WordAssessment, (word)=>word.phone_assessment,{nullable:false, onDelete:'CASCADE'})
    @JoinColumn({ name: "word_assessment_id" })
    word_assessment: WordAssessment
}