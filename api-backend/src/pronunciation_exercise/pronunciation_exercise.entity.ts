import { Episode } from "../episode/episode.entity";
import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class PronunciationExercise {
    @PrimaryGeneratedColumn()
    id: number

    @Column('tinytext', { nullable: false })
    phrase: string;

    @Column('tinytext')
    meaning: string

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;

    @ManyToOne(() => Episode, (episode) => episode.pronunciation_exercises, { onDelete: 'CASCADE',nullable:false })
    episode: Episode
}