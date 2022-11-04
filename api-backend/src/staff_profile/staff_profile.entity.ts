import { User } from '../user/user.entity';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, OneToMany } from 'typeorm';
import { StaffExperience } from '../staff_experience/staff_experience.entity';
import { RatingTeacher } from '../rating_teacher/rating_teacher.entity';
@Entity()
export class StaffProfile {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    link_certification: string;

    @Column()
    link_cv: string;

    @Column('text')
    introduction: string

    @ManyToOne(()=>User,(user)=>user.staff_profile)
    user:User

    @OneToMany(()=>StaffExperience,(staff_experience)=>staff_experience.staff_profile)
    staff_experience: StaffExperience[]

    

}