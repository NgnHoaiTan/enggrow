import { Episode } from "../episode/episode.entity";
import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class IdentificationExercise {
    @PrimaryGeneratedColumn()
    id: number

    @Column({ nullable: false,length:20 })
    true_word: string

    @Column({ nullable: false,length:20 })
    false_word: string;

    @Column('tinytext',{nullable:false})
    audio_url:string   
    
    @Column('tinytext',{nullable:false})
    audio_id:string

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;

    @ManyToOne(() => Episode, (episode) => episode.identification_exercises, { onDelete: 'CASCADE', nullable:false })
    episode: Episode
}