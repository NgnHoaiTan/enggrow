import { Episode } from "../episode/episode.entity";
import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class Exercise {
    @PrimaryGeneratedColumn()
    id: number

    @Column('tinytext',{ nullable: false})
    phrase: string;


    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;

    @ManyToOne(()=>Episode,(episode) => episode.exercises,{onDelete:'CASCADE'})
    episode: Episode
}