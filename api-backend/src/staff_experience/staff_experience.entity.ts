import { StaffProfile } from '../staff_profile/staff_profile.entity';
import { Entity, Column,CreateDateColumn, UpdateDateColumn, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
@Entity()
export class StaffExperience {
    @PrimaryGeneratedColumn()
    id: number

    @Column({length:50})
    position: string;

    @Column('text')
    description: string;

    @Column({type:'date',nullable:true })
    from_time: Date;

    @Column({type:'date',nullable:true })
    to_time: Date;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;

    @ManyToOne(()=>StaffProfile,(staff_profile)=>staff_profile.staff_experience)
    staff_profile:StaffProfile
    
}