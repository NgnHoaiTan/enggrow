import { PronunciationCourse } from "../pronunciation_course/pronunciation_course.entity";
import { User } from "../user/user.entity";
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
@Entity()
export class ParticipantInCourse {
    @PrimaryGeneratedColumn()
    id: number

    @CreateDateColumn()
    created_at: Date

    @ManyToOne(()=>User, (user)=>user.member_in_course,{nullable:false, onDelete:'CASCADE'})
    @JoinColumn({name:'participantId'})
    participant: User

    @ManyToOne(()=>PronunciationCourse,(course) => course.members,{nullable:false, onDelete:'CASCADE'})
    course: PronunciationCourse
}