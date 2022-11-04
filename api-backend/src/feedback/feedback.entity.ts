import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, ManyToOne } from 'typeorm';
import { User } from '../user/user.entity';

@Entity()
export class Feedback {
    @PrimaryGeneratedColumn()
    id: number

    @Column('text')
    content: string

    @CreateDateColumn()
    created_at: Date;

    @ManyToOne(()=>User, (user)=>user.feedback,{nullable:false})
    user: User
}