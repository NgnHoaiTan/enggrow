import { User } from '../user/user.entity';
import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, ManyToOne } from 'typeorm';
@Entity()
export class Notification {
    @PrimaryGeneratedColumn()
    id: number

    @Column({nullable: false, length: 30})
    name: string;

    @Column()
    content: string

    @CreateDateColumn()
    created_at: Date;

    @Column({type:'datetime' })
    read_at: Date

    @Column({default:false})
    status: boolean

    @ManyToOne(()=>User,(user) => user.notification)
    user: User

}