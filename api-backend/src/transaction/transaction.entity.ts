import { User } from '../user/user.entity';
import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, ManyToOne } from 'typeorm';
@Entity()
export class Transaction {
    @PrimaryGeneratedColumn()
    id: number
    
    @Column()
    status: boolean;

    @CreateDateColumn()
    created_at: Date;

    @ManyToOne(()=>User, (user)=>user.transaction,{nullable:false})
    user: User
}