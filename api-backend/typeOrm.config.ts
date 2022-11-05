import { DataSource } from 'typeorm';
import { ConfigService } from '@nestjs/config';
import { config } from 'dotenv';
import { User } from './src/user/user.entity';
import { Role } from './src/role/role.entity';
import { Avatar } from './src/avatar/avatar.entity';
import { StaffProfile } from './src/staff_profile/staff_profile.entity';
import { StaffExperience } from './src/staff_experience/staff_experience.entity';
import { Notification } from './src/notification/notification.entity';
import { SubscriptionPlan } from './src/subscription_plan/subscription_plan.entity';
import { Feedback } from './src/feedback/feedback.entity';
import { Achievement } from './src/achievement/achievement.entity';
import { FolderFlashcard } from './src/folder_flashcard/folder_flashcard.entity';
import { Flashcard } from './src/flashcard/flashcard.entity';
import { Transaction } from './src/transaction/transaction.entity';
import { UserAchievement } from './src/user_achievement/user_achievement.entity';
import { UserSubscription } from './src/user_subscription/user_subscription.entity';
import { PronunciationCourse } from './src/pronunciation_course/pronunciation_course.entity';
import { Episode } from './src/episode/episode.entity';
import { $npmConfigName1667449606405 } from './migrations/1667449606405-$npm_config_name';
import { PronunciationExercise } from './src/pronunciation_exercise/pronunciation_exercise.entity';
import { IdentificationExercise } from './src/identification_exercise/identification_exercise.entity';
import { $npmConfigName1667634672828 } from './migrations/1667634672828-$npm_config_name';
import {$npmConfigName1667634795859} from './migrations/1667634795859-$npm_config_name'



config();

const configService = new ConfigService();

export default new DataSource({
   type: 'mysql',
   host: configService.get('DBMYSQL_HOST'),
   port: configService.get('DBMYSQL_PORT'),
   username: configService.get('DBMYSQL_USER'),
   password: '',
   database: configService.get('DBMYSQL_DB'),
   entities: [User, Role, Avatar, StaffProfile, StaffExperience, Notification, SubscriptionPlan, Feedback,
      Achievement, FolderFlashcard, Flashcard, Transaction, UserAchievement, UserSubscription,
      PronunciationCourse, Episode, PronunciationExercise, IdentificationExercise
   ],
   migrations: [
      $npmConfigName1667634795859
   ],
});