import { User } from '../user/user.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
@Entity()
export class Role {
    @PrimaryGeneratedColumn()
    id: number

    @Column('varchar',{length:50})
    name: string

    @OneToMany(()=>User, (user) => user.role)
    user: User[]
}