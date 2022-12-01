import { FolderFlashcard } from '../folder_flashcard/folder_flashcard.entity';
import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, ManyToOne, OneToMany } from 'typeorm';
import { CardPronunciationResult } from '../card_pronunciation_result/card_pronunciation_result.entity';
import { CardLearned } from '../card_learned/card_learned.entity';
@Entity()
export class Flashcard {
    @PrimaryGeneratedColumn()
    id: number

    @Column({ nullable: false, length: 50 })
    term: string;

    @Column('tinytext',{ nullable: true })
    meaning: string;

    @Column({ nullable: true, length:100 })
    example: string;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;

    

    //new - learning
    @Column({default: 0 })
    type: number

    @Column({ type: 'date',default:()=>'NOW()' })
    dueDate: string

    @Column({default: 0 })
    interval: number

    @Column({default: 0 })
    repetition: number

    @Column({type: "numeric", precision: 3, scale: 2, default: 2.5})
    efactor: number

    

    @ManyToOne(() => FolderFlashcard, (folder_flashcard) => folder_flashcard.flashcard, { nullable: false, onDelete: 'CASCADE' })
    folder_flashcard: FolderFlashcard

    @OneToMany(()=>CardPronunciationResult, (result) => result.flashcard)
    card_pronunciation_result: CardPronunciationResult[]

    @OneToMany(()=>CardLearned, (result) => result.flashcard)
    card_learned: CardLearned[]
}