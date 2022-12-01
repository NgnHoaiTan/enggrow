import { User } from '../user/user.entity';
import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, ManyToOne } from 'typeorm';
@Entity()
export class Avatar {
    @PrimaryGeneratedColumn()
    id: number

    @Column({nullable: false,length:120})
    image_url: string;

    @Column({nullable: false,length:60})
    image_id: string;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;

    @ManyToOne(()=>User, (user)=>user.avatar,{nullable:false})
    user: User
}