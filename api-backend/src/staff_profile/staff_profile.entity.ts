import { User } from '../user/user.entity';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, OneToMany, OneToOne, JoinColumn } from 'typeorm';
import { StaffExperience } from '../staff_experience/staff_experience.entity';

@Entity()
export class StaffProfile {
    @PrimaryGeneratedColumn()
    id: number

    @Column({length:120})
    certification_url: string;

    @Column({length:60})
    certification_id: string;

    @Column('text')
    introduction: string

    @OneToOne(()=>User,(user)=>user.staff_profile,{nullable:false, onDelete:'CASCADE', onUpdate:'CASCADE'})
    user:User

    @OneToMany(()=>StaffExperience,(staff_experience)=>staff_experience.staff_profile)
    staff_experience: StaffExperience[]

    

}