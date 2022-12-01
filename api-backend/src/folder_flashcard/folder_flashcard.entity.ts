import { User } from '../user/user.entity';
import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, ManyToOne, OneToMany } from 'typeorm';
import { Flashcard } from '../flashcard/flashcard.entity';
@Entity()
export class FolderFlashcard {
    @PrimaryGeneratedColumn()
    id: number

    @Column({nullable: false, length: 50})
    name: string;
    
    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;


    @ManyToOne(()=>User, (user)=>user.folder_flashcard,{nullable:false, eager:true, onDelete: 'CASCADE'})
    user: User

    @OneToMany(()=>Flashcard,(flashcard)=>flashcard.folder_flashcard,{nullable:false})
    flashcard: Flashcard[]
}