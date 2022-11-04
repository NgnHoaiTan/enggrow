import { LiveCourse } from '../live_course/live_course.entity';
import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, ManyToMany } from 'typeorm';
import { Reels } from '../reels/reels.entity';
@Entity()
export class Tag {
    @PrimaryGeneratedColumn()
    id: number

    @Column('nvarchar',{length:100})
    name: string

    @CreateDateColumn()
    created_at: Date;

    @ManyToMany(()=>LiveCourse, (livecourse) => livecourse.tags)
    livecourses: LiveCourse[]

    @ManyToMany(()=>Reels, (reels) => reels.tags)
    reels: Reels[]

}