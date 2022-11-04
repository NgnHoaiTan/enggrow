import { User } from '../user/user.entity';
import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, ManyToOne } from 'typeorm';
@Entity()
export class Avatar {
    @PrimaryGeneratedColumn()
    id: number

    @Column({nullable: false})
    link_image: string;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;

    @ManyToOne(()=>User, (user)=>user.avatar,{nullable:false})
    user: User
}