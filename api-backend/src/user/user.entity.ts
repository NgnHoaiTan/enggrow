import { Role } from '../role/role.entity';
import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, ManyToOne, OneToMany, ManyToMany } from 'typeorm';
import { Transaction } from '../transaction/transaction.entity';
import { FolderFlashcard } from '../folder_flashcard/folder_flashcard.entity';
import { UserAchievement } from '../user_achievement/user_achievement.entity';
import { Avatar } from '../avatar/avatar.entity';
import { Feedback } from '../feedback/feedback.entity';
import { UserSubscription } from '../user_subscription/user_subscription.entity';
import { StaffProfile } from '../staff_profile/staff_profile.entity';
import { Notification } from '../notification/notification.entity';
import { PronunciationCourse } from '../pronunciation_course/pronunciation_course.entity';
@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column("nvarchar", { length: 100, nullable: false })
  name: string;

  // tieu su - gioi thieu o trang ca nhan
  @Column({ nullable: true })
  bio: string

  @Column({ nullable: true })
  address: string;

  @Column({ default: "'https://deejayfarm.com/wp-content/uploads/2019/10/Profile-pic.jpg'" })
  current_avatar: string;

  // @Column("varchar", { length: 100, unique: true, nullable: false })
  // email: string;

  // @Column({nullable: true})
  // email_verified: boolean

  // @Column({nullable:true})
  // googleId: string

  @Column("varchar", { length: 11, unique: true, nullable: true })
  phone_number: string;

  @Column("varchar", { length: 16, unique: true, nullable: false })
  username: string;

  @Column("varchar", { length: 16, unique: false, nullable: false })
  password: string;

  @Column({ default: 0 })
  score: number

  // @Column({ type: 'date',default:()=>'NOW()' })
  // last_study: string

  @Column({ type: 'datetime', default: () => 'NOW()' })
  dob: Date

  @CreateDateColumn()
  created_at: Date;


  // relations

  @ManyToOne(() => Role, (role) => role.user, { nullable: true })
  role: Role

  @OneToMany(() => Transaction, (transaction) => transaction.user, { nullable: true })
  transaction: Transaction[]

  @OneToMany(() => FolderFlashcard, (folder_flashcard) => folder_flashcard.user, { nullable: true })
  folder_flashcard: FolderFlashcard[]

  @OneToMany(() => UserAchievement, (user_achievement) => user_achievement.user, { nullable: true })
  user_achievement: UserAchievement[]

  @OneToMany(() => UserSubscription, (user_subscription) => user_subscription.user, { nullable: true })
  user_subscription: UserSubscription[]

  @OneToMany(() => Avatar, (avatar) => avatar.user, { nullable: true })
  avatar: Avatar[]

  @OneToMany(() => StaffProfile, (staff_profile) => staff_profile.user, { nullable: true })
  staff_profile: StaffProfile[]


  @OneToMany(() => Feedback, (feedback) => feedback.user, { nullable: true })
  feedback: Feedback[]

  @OneToMany(() => Notification, (notification) => notification.user, { nullable: true })
  notification: Notification[]

  @OneToMany(() => PronunciationCourse, (course) => course.creator, { nullable: true })
  own_pronunciation_course: PronunciationCourse[]


}