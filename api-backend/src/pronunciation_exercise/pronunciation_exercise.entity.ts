import { Episode } from "../episode/episode.entity";
import { Column, CreateDateColumn, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { ResultPronunciationExercise } from "../result_pronunciation_exercise/result_pronunciation_exercise.entity";

@Entity()
export class PronunciationExercise {
    @PrimaryGeneratedColumn()
    id: number

    @Column('tinytext', { nullable: false })
    phrase: string;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;

    @ManyToOne(() => Episode, (episode) => episode.pronunciation_exercises, { onDelete: 'CASCADE',nullable:false })
    episode: Episode

    @OneToMany(()=>ResultPronunciationExercise, (result) => result.exercise)
    result_pronunciation: ResultPronunciationExercise[]
}