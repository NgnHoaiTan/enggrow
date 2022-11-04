import { User } from '../user/user.entity';
import { Entity, Column,  CreateDateColumn, ManyToOne, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';
import { StaffProfile } from '../staff_profile/staff_profile.entity';


@Entity()
export class RatingTeacher {
    @PrimaryGeneratedColumn()
    id:number

    // @ManyToOne(()=>User, (user)=>user.rating_teacher,{nullable:false})
    // user: User


    // @ManyToOne(()=>StaffProfile, (teacher)=>teacher.rating_teacher,{nullable:false})
    // teacher: User

    @Column()
    rating: number

    @Column('text')
    comment: string

    @CreateDateColumn()
    created_at: Date;
}