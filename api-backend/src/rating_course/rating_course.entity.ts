import { User } from '../user/user.entity';
import { Entity, Column,  CreateDateColumn, ManyToOne, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';
import { LiveCourse } from '../live_course/live_course.entity';


@Entity()
export class RatingCourse {

    @PrimaryGeneratedColumn()
    id:number

    @ManyToOne(()=>LiveCourse, (livecourse)=>livecourse.rating_course,{nullable:false})
    livecourse: LiveCourse

    @Column()
    rating: number

    @Column('text')
    comment: string

    @CreateDateColumn()
    created_at: Date;
}