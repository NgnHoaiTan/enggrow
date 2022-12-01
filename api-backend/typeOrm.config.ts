import { DataSource } from 'typeorm';
import { ConfigService } from '@nestjs/config';
import { config } from 'dotenv';
import { User } from './src/user/user.entity';
import { Role } from './src/role/role.entity';
import { Avatar } from './src/avatar/avatar.entity';
import { StaffProfile } from './src/staff_profile/staff_profile.entity';
import { StaffExperience } from './src/staff_experience/staff_experience.entity';
import { FolderFlashcard } from './src/folder_flashcard/folder_flashcard.entity';
import { Flashcard } from './src/flashcard/flashcard.entity';
import { PronunciationCourse } from './src/pronunciation_course/pronunciation_course.entity';
import { Episode } from './src/episode/episode.entity';
import { PronunciationExercise } from './src/pronunciation_exercise/pronunciation_exercise.entity';
import { CardLearned } from './src/card_learned/card_learned.entity';
import { CardPronunciationResult } from './src/card_pronunciation_result/card_pronunciation_result.entity';
import { ResultPronunciationExercise } from './src/result_pronunciation_exercise/result_pronunciation_exercise.entity';
import { PhoneAssessment } from './src/phone_assessment/phone_assessment.entity';
import { WordAssessment } from './src/word_assessment/word_assessment.entity';
import { ParticipantInCourse } from './src/participant_in_course/participant_in_course.entity';
import { $npmConfigName1669276295725 } from './migrations/1669276295725-$npm_config_name';
import { $npmConfigName1669350249666 } from './migrations/1669350249666-$npm_config_name';



config();

const configService = new ConfigService();

export default new DataSource({
   type: 'mysql',
   host: configService.get('DBMYSQL_HOST'),
   port: configService.get('DBMYSQL_PORT'),
   username: configService.get('DBMYSQL_USER'),
   password: '',
   database: configService.get('DBMYSQL_DB'),
   entities: [User, Role, Avatar, StaffProfile, StaffExperience,
      FolderFlashcard, Flashcard,
      PronunciationCourse, Episode, PronunciationExercise,
      CardLearned, CardPronunciationResult, ResultPronunciationExercise,
      PhoneAssessment, WordAssessment, ParticipantInCourse
   ],
   migrations: [
      $npmConfigName1669350249666
   ],
});