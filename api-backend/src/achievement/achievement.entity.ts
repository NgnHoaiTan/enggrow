import { UserAchievement } from '../user_achievement/user_achievement.entity';
import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, OneToMany } from 'typeorm';

@Entity()
export class Achievement
 {
    @PrimaryGeneratedColumn()
    id: number

    @Column('nvarchar',{length:100, nullable:false})
    name: string

    @Column({nullable: false})
    link_image: string;

    @Column({nullable:false})
    requirement: number

    @Column({nullable:false,default:1})
    achievement_level: number

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;

    @OneToMany(()=>UserAchievement, (user_achievement)=>user_achievement.achievement,{nullable:false})
    user_achievement: UserAchievement
}