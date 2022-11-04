import { Tag } from '../tag/tag.entity';
import { Entity, Column, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { User } from '../user/user.entity';
import { LiveCourse } from '../live_course/live_course.entity';
@Entity()
export class MemberCourse {
    @PrimaryGeneratedColumn()
    id:number

    @Column({type:'datetime'})
    register_at: Date;
    
    @ManyToOne(()=>LiveCourse,(livecourse) => livecourse.member)
    livecourse: LiveCourse

}