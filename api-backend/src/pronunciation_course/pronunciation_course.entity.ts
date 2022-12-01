
import { Episode } from '../episode/episode.entity';
import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, ManyToMany, JoinTable, ManyToOne, OneToMany } from 'typeorm';
import { User } from '../user/user.entity';
import { ParticipantInCourse } from '../participant_in_course/participant_in_course.entity';



@Entity()
export class PronunciationCourse {
    @PrimaryGeneratedColumn()
    id: number

    @Column('nvarchar', {nullable: false,length:70})
    name: string

    @Column('text',{ nullable: false})
    description: string

    @Column({default:null, length:100})
    poster: string

    @Column({default:null, length:50})
    poster_id: string
    
    @Column('varchar', {nullable: false, default:'all',length:20})
    level: string

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;


    @ManyToOne(()=>User,(creator) => creator.own_pronunciation_course)
    creator: User

    @OneToMany(()=>Episode, (episode) => episode.pronunciation_course)
    episode: Episode[]

    @OneToMany(()=>ParticipantInCourse,(participant) => participant.course)
    members: ParticipantInCourse[]

}