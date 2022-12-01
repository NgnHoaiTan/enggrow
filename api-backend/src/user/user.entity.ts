import { Role } from '../role/role.entity';
import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, ManyToOne, OneToMany, ManyToMany, JoinColumn, OneToOne } from 'typeorm';
import { FolderFlashcard } from '../folder_flashcard/folder_flashcard.entity';
import { Avatar } from '../avatar/avatar.entity';
import { StaffProfile } from '../staff_profile/staff_profile.entity';
import { PronunciationCourse } from '../pronunciation_course/pronunciation_course.entity';
import { ResultPronunciationExercise } from '../result_pronunciation_exercise/result_pronunciation_exercise.entity';
import { CardPronunciationResult } from '../card_pronunciation_result/card_pronunciation_result.entity';
import { CardLearned } from '../card_learned/card_learned.entity';
import { ParticipantInCourse } from '../participant_in_course/participant_in_course.entity';


@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column("nvarchar", { length: 40, nullable: false })
  name: string;

  @Column({ nullable: true, length:60 })
  address: string;

  @Column({ default: "https://res.cloudinary.com/hoaitan/image/upload/v1668854027/engrow/no_avatar_gd2rni.jpg", length:150 })
  current_avatar: string;

  @Column("varchar", { length: 50, unique: true, nullable: true })
  email: string;

  @Column("varchar", { length: 11, unique: true, nullable: true })
  phone_number: string;

  @Column("varchar", { length: 16, unique: true, nullable: false })
  username: string;

  @Column("varchar", { length: 16, unique: false, nullable: false })
  password: string;

  // @Column({ default: 0 })
  // score: number

  @Column({ type: 'datetime', default: null, nullable:true })
  dob: Date

  @CreateDateColumn()
  created_at: Date;

  // @Column('datetime',{default: null, nullable:true})
  // last_online: Date

  // @Column({default: false})
  // is_online: boolean

  // relations

  @ManyToOne(() => Role, (role) => role.user, {nullable: false, onUpdate:'CASCADE'})
  role: Role

  @OneToMany(() => FolderFlashcard, (folder_flashcard) => folder_flashcard.user, { nullable: true })
  folder_flashcard: FolderFlashcard[]

  @OneToMany(() => Avatar, (avatar) => avatar.user, { nullable: true })
  avatar: Avatar[]

  @OneToOne(() => StaffProfile,(profile) => profile.user ,{ nullable: true, onUpdate:'CASCADE',onDelete:'SET NULL' })
  @JoinColumn({name:'staff_profileId'})
  staff_profile: StaffProfile[]


  @OneToMany(() => PronunciationCourse, (course) => course.creator, { nullable: true })
  own_pronunciation_course: PronunciationCourse[]

  @OneToMany(()=>ResultPronunciationExercise, (result) => result.user)
  result_pronunciation_exercise: ResultPronunciationExercise[]

  @OneToMany(()=>CardPronunciationResult, (result) => result.user)
  card_pronunciation_result: CardPronunciationResult[]

  @OneToMany(()=>CardLearned, (card_learned) => card_learned.user)
  card_learned: CardLearned[]

  @OneToMany(()=>ParticipantInCourse, (participant) => participant.participant)
  member_in_course: ParticipantInCourse[]
}