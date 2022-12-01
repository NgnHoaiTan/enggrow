import { Flashcard } from "../flashcard/flashcard.entity";
import { User } from "../user/user.entity";
import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class CardPronunciationResult {
    @PrimaryGeneratedColumn()
    id: number

    @Column({nullable: false})
    score_gain: number

    @Column({nullable:false, length:100})
    pronounce_url: string

    @Column({nullable:false, length:30})
    pronounce_id: string

    @CreateDateColumn()
    created_at: Date;

    @ManyToOne(()=>Flashcard, (flashcard) => flashcard.card_pronunciation_result,{nullable:false})
    flashcard: Flashcard

    @ManyToOne(()=>User, (user) => user.card_pronunciation_result,{nullable:false})
    user: User
}