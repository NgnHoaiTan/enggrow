import { Achievement } from '../achievement/achievement.entity';
import { User } from '../user/user.entity';
import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, ManyToOne, OneToMany, ManyToMany, PrimaryColumn, JoinColumn } from 'typeorm';


@Entity()
export class UserAchievement {
    @PrimaryGeneratedColumn()
    id:number

    @ManyToOne(()=>User, (user)=>user.user_achievement,{nullable:false})
    user: User


    @ManyToOne(()=>Achievement, (achievement)=>achievement.user_achievement,{nullable:false})
    achievement: Achievement

    @Column({default:0, nullable:false})
    progress: number

    @Column({type:'datetime'})
    finished_date: Date

    @CreateDateColumn()
    created_at: Date;
}