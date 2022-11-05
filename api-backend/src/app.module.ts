
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import typeOrmConfig from '../typeOrm.config';
import { ConfigService } from '@nestjs/config';
import { config } from 'dotenv';
import { DataSource } from 'typeorm';
import { UserModule } from './user/user.module';
import { UserController } from './user/user.controller';
import { UserService } from './user/user.service';
import { RoleController } from './role/role.controller';
import { RoleService } from './role/role.service';
import { RoleModule } from './role/role.module';
import { AvatarModule } from './avatar/avatar.module';
import { NotificationModule } from './notification/notification.module';
import { SubscriptionPlanModule } from './subscription_plan/subscription_plan.module';
import { FeedbackModule } from './feedback/feedback.module';
import { AchievementModule } from './achievement/achievement.module';
import { StaffProfileController } from './staff_profile/staff_profile.controller';
import { StaffProfileModule } from './staff_profile/staff_profile.module';
import { StaffExperienceModule } from './staff_experience/staff_experience.module';
import { FolderFlashcardModule } from './folder_flashcard/folder_flashcard.module';
import { FlashcardModule } from './flashcard/flashcard.module';
import { PronunciationCourseModule} from './pronunciation_course/pronunciation_course.module';
import { TransactionModule } from './transaction/transaction.module';
import { UserAchievementModule } from './user_achievement/user_achievement.module';
import { UserSubscriptionModule } from './user_subscription/user_subscription.module';
import { AuthModule } from './auth/auth.module';
import { AuthService } from './auth/auth.service';
import { AuthController } from './auth/auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { EpisodeModule } from './episode/episode.module';
import { CloudinaryModule } from './cloudinary/cloudinary.module';
import { PronunciationExerciseService } from './pronunciation_exercise/pronunciation_exercise.service';
import { PronunciationExerciseModule } from './pronunciation_exercise/pronunciation_exercise.module';
import { IdentificationExerciseService } from './identification_exercise/identification_exercise.service';
import { IdentificationExerciseModule } from './identification_exercise/identification_exercise.module';
import { PronunciationExerciseController } from './pronunciation_exercise/pronunciation_exercise.controller';
import { IdentificationExerciseController } from './identification_exercise/identification_exercise.controller';



config();

@Module({
  imports: [
    JwtModule.register({
      secret:process.env.SECRET_KEY,
      signOptions:{expiresIn:'200000s'},
    }),
    ConfigModule.forRoot(
      {
        isGlobal: true
      }
    ),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'mysql',
        host: configService.get('DBMYSQL_HOST'),
        port: configService.get('DBMYSQL_PORT'),
        username: configService.get('DBMYSQL_USER'),
        password: '',
        database: configService.get('DBMYSQL_DB'),
        entities: [],
        autoLoadEntities: true,
        synchronize: false,
      }),
      // dataSource receives the configured DataSourceOptions
      // and returns a Promise<DataSource>.
      dataSourceFactory: async (options) => {
        const dataSource = await new DataSource(options).initialize();
        return dataSource; 
      },
    }),
    PassportModule.register({session:true}),
    UserModule,
    RoleModule,
    AvatarModule,
    NotificationModule,
    SubscriptionPlanModule,
    FeedbackModule,
    AchievementModule,
    StaffProfileModule,
    StaffExperienceModule,
    FolderFlashcardModule,
    FlashcardModule,
    PronunciationCourseModule,
    TransactionModule,
    UserAchievementModule,
    UserSubscriptionModule,
    AuthModule,
    EpisodeModule,
    CloudinaryModule,
    PronunciationExerciseModule,
    IdentificationExerciseModule,
  ],
  controllers: [UserController, RoleController, StaffProfileController, AuthController, PronunciationExerciseController, IdentificationExerciseController],
  providers: [UserService, RoleService, AuthService,PronunciationExerciseService, IdentificationExerciseService],
})
export class AppModule { }
