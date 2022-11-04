import { Exercise } from "../exercise/exercise.entity";
import { PronunciationCourse } from "../pronunciation_course/pronunciation_course.entity";
import { Column, CreateDateColumn, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class Episode {
    @PrimaryGeneratedColumn()
    id: number

    @Column('nvarchar',{ nullable: false, length:100})
    name: string;

    @Column('text',{ nullable: false})
    description: string

    @Column({nullable: true, default: null})
    video_url: string

    @Column({nullable:true,default: null})
    video_file_name:string

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;

    @OneToMany(()=>Exercise,(exercise) => exercise.episode)
    exercises: Exercise[]

    @ManyToOne(()=>PronunciationCourse,(pronunciation) => pronunciation.episode , {onDelete:'CASCADE'})
    pronunciation_course: PronunciationCourse
}