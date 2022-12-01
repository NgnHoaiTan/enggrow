import { Episode } from "../episode/episode.entity";
import { Column, CreateDateColumn, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";


@Entity()
export class IdentificationExercise {
    @PrimaryGeneratedColumn()
    id: number

    @Column({ nullable: false,length:60 })
    true_option: string

    @Column({ nullable: false,length:60 })
    false_option: string;

    @Column('tinytext',{nullable:false})
    audio_url:string   
    
    @Column('tinytext',{nullable:false})
    audio_id:string

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;

    // @ManyToOne(() => Episode, (episode) => episode.identification_exercises, { onDelete: 'CASCADE', nullable:false })
    // episode: Episode

}