import { Tag } from '../tag/tag.entity';
import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, ManyToMany, JoinTable, ManyToOne } from 'typeorm';
import { User } from '../user/user.entity';
@Entity()
export class Reels {
    @PrimaryGeneratedColumn()
    id: number

    @Column({nullable: false})
    reels: string

    @Column({default:0})
    view: number;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;

    // @ManyToOne(()=>User,(creator) => creator.reels)
    // creator: User

    @ManyToMany(()=>Tag,(tags)=>tags.reels)
    @JoinTable({
        name:'reels_tags'
    })
    tags: Tag[]
}