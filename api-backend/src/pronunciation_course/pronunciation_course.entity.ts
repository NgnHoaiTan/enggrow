
import { Episode } from '../episode/episode.entity';
import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, ManyToMany, JoinTable, ManyToOne, OneToMany } from 'typeorm';
import { User } from '../user/user.entity';


@Entity()
export class PronunciationCourse {
    @PrimaryGeneratedColumn()
    id: number

    @Column('nvarchar', {nullable: false})
    name: string

    @Column('text',{ nullable: false})
    description: string

    @Column({default:null})
    poster: string

    @Column({default:null})
    poster_id: string
    
    @Column('varchar', {nullable: false, default:'all'})
    level: string

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;

    @ManyToOne(()=>User,(creator) => creator.own_pronunciation_course)
    creator: User

    @OneToMany(()=>Episode, (episode) => episode.pronunciation_course)
    episode: Episode[]



}