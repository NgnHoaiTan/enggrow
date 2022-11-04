import { Tag } from '../tag/tag.entity';
import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, ManyToMany, JoinTable, ManyToOne, OneToMany } from 'typeorm';
import { User } from '../user/user.entity';
import { MemberCourse } from '../member_course/member_course.entity';
import { RatingCourse } from '../rating_course/rating_course.entity';
@Entity()
export class LiveCourse {
    @PrimaryGeneratedColumn()
    id: number

    @Column({nullable: false, length: 100})
    name: string;

    @Column('text',{nullable: false})
    description: string;

    @Column({type:'datetime', nullable: false })
    start_time: Date

    @Column({nullable:false})
    duration: number

    @Column({nullable:true})
    slots: number

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;

    @Column({nullable:false, default: true})
    status:boolean

    @ManyToMany(()=>Tag,(tags)=>tags.livecourses)
    @JoinTable({
        name:'livecourse_tags'
    })
    tags: Tag[]

    @OneToMany(()=>MemberCourse,(member) => member.livecourse)
    member: MemberCourse[]


    @OneToMany(()=>RatingCourse,(rating_course)=>rating_course.livecourse)
    rating_course: RatingCourse[]
}