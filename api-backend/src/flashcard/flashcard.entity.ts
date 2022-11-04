import { FolderFlashcard } from '../folder_flashcard/folder_flashcard.entity';
import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, ManyToOne } from 'typeorm';
@Entity()
export class Flashcard {
    @PrimaryGeneratedColumn()
    id: number

    @Column({ nullable: false, length: 100 })
    term: string;

    @Column({ nullable: true, length: 100 })
    meaning: string;

    @Column({ nullable: true, length: 200 })
    example: string;
    // @Column({nullable: true})
    // image: string

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;

    

    //new - learning - due
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
}