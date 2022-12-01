import { User } from "../user/user.entity";
import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Flashcard } from "../flashcard/flashcard.entity";

@Entity()
export class CardLearned {
    @PrimaryGeneratedColumn()
    id: number

    @Column({nullable: false})
    score_gain: number

    @CreateDateColumn()
    created_at: Date;

    @ManyToOne(()=>Flashcard, (flashcard)=>flashcard.card_learned,{nullable:false})
    flashcard: Flashcard

    @ManyToOne(()=>User,(user) => user.card_learned,{nullable:false})
    user: User
}