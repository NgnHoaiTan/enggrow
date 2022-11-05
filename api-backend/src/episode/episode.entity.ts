import { PronunciationCourse } from "../pronunciation_course/pronunciation_course.entity";
import { Column, CreateDateColumn, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { PronunciationExercise } from "../pronunciation_exercise/pronunciation_exercise.entity";
import { IdentificationExercise } from "../identification_exercise/identification_exercise.entity";

@Entity()
export class Episode {
    @PrimaryGeneratedColumn()
    id: number

    @Column('nvarchar',{ nullable: false, length:100})
    name: string;

    @Column('tinytext',{ nullable: false})
    description: string

    @Column('text',{nullable:true})
    fundamentals: string

    @Column({nullable: true, default: null})
    video_url: string

    @Column({nullable:true,default: null})
    video_file_name:string

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;

    @OneToMany(()=>PronunciationExercise,(exercise) => exercise.episode)
    pronunciation_exercises: PronunciationExercise[]

    @OneToMany(()=>IdentificationExercise,(exercise) => exercise.episode)
    identification_exercises: IdentificationExercise[]

    @ManyToOne(()=>PronunciationCourse,(pronunciation) => pronunciation.episode , {onDelete:'CASCADE'})
    pronunciation_course: PronunciationCourse
}