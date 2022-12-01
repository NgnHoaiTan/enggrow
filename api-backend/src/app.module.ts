
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
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
import { StaffProfileController } from './staff_profile/staff_profile.controller';
import { StaffProfileModule } from './staff_profile/staff_profile.module';
import { StaffExperienceModule } from './staff_experience/staff_experience.module';
import { FolderFlashcardModule } from './folder_flashcard/folder_flashcard.module';
import { FlashcardModule } from './flashcard/flashcard.module';
import { PronunciationCourseModule} from './pronunciation_course/pronunciation_course.module';
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
import { ResultPronunciationExerciseModule } from './result_pronunciation_exercise/result_pronunciation_exercise.module';
import { PhoneAssessmentModule } from './phone_assessment/phone_assessment.module';
import { CardPronunciationResultModule } from './card_pronunciation_result/card_pronunciation_result.module';
import { CardLearnedModule } from './card_learned/card_learned.module';
import { WordAssessmentModule } from './word_assessment/word_assessment.module';
import { ParticipantInCourseModule } from './participant_in_course/participant_in_course.module';
import { StaffManagementModule } from './staff_management/staff_management.module';
import { UserManagementModule } from './user_management/user_management.module';
import { ScheduleModule } from '@nestjs/schedule';
import { BackupModule } from './backup/backup.module';
import { BackupController } from './backup/backup.controller';



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
    ScheduleModule.forRoot(),
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
    StaffProfileModule,
    StaffExperienceModule,
    FolderFlashcardModule,
    FlashcardModule,
    PronunciationCourseModule,
    AuthModule,
    EpisodeModule,
    CloudinaryModule,
    PronunciationExerciseModule,
    ResultPronunciationExerciseModule,
    PhoneAssessmentModule,
    CardPronunciationResultModule,
    CardLearnedModule,
    WordAssessmentModule,
    ParticipantInCourseModule,
    StaffManagementModule,
    UserManagementModule,
    BackupModule
  ],
  controllers: [UserController, RoleController, StaffProfileController, AuthController, PronunciationExerciseController, BackupController],
  providers: [UserService, RoleService, AuthService,PronunciationExerciseService],
})
export class AppModule { }
