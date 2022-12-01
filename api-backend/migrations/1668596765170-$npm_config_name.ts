import { MigrationInterface, QueryRunner } from "typeorm";

export class $npmConfigName1668596765170 implements MigrationInterface {
    name = '$npmConfigName1668596765170'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`user\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(40) NOT NULL, \`bio\` varchar(100) NULL, \`address\` varchar(255) NULL, \`current_avatar\` varchar(255) NOT NULL DEFAULT 'https://deejayfarm.com/wp-content/uploads/2019/10/Profile-pic.jpg', \`phone_number\` varchar(11) NULL, \`username\` varchar(16) NOT NULL, \`password\` varchar(16) NOT NULL, \`score\` int NOT NULL DEFAULT '0', \`dob\` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`roleId\` int NULL, UNIQUE INDEX \`IDX_01eea41349b6c9275aec646eee\` (\`phone_number\`), UNIQUE INDEX \`IDX_78a916df40e02a9deb1c4b75ed\` (\`username\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`card_learned\` CHANGE \`learned_at\` \`learned_at\` date NOT NULL DEFAULT CURRENT_TIMESTAMP`);
        await queryRunner.query(`ALTER TABLE \`flashcard\` CHANGE \`meaning\` \`meaning\` varchar(100) NULL`);
        await queryRunner.query(`ALTER TABLE \`flashcard\` CHANGE \`example\` \`example\` varchar(200) NULL`);
        await queryRunner.query(`ALTER TABLE \`flashcard\` CHANGE \`dueDate\` \`dueDate\` date NOT NULL DEFAULT CURRENT_TIMESTAMP`);
        await queryRunner.query(`ALTER TABLE \`folder_flashcard\` CHANGE \`description\` \`description\` varchar(255) NULL`);
        await queryRunner.query(`ALTER TABLE \`staff_experience\` CHANGE \`staffProfileId\` \`staffProfileId\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`staff_profile\` CHANGE \`userId\` \`userId\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`word_assessment\` CHANGE \`result_pronunciation_id\` \`result_pronunciation_id\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`episode\` CHANGE \`fundamentals\` \`fundamentals\` text NULL`);
        await queryRunner.query(`ALTER TABLE \`episode\` CHANGE \`video_url\` \`video_url\` varchar(255) NULL`);
        await queryRunner.query(`ALTER TABLE \`episode\` CHANGE \`video_file_name\` \`video_file_name\` varchar(255) NULL`);
        await queryRunner.query(`ALTER TABLE \`pronunciation_course\` CHANGE \`poster\` \`poster\` varchar(255) NULL`);
        await queryRunner.query(`ALTER TABLE \`pronunciation_course\` CHANGE \`poster_id\` \`poster_id\` varchar(255) NULL`);
        await queryRunner.query(`ALTER TABLE \`pronunciation_course\` CHANGE \`creatorId\` \`creatorId\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`card_pronunciation_result\` ADD CONSTRAINT \`FK_5cca1b053ba7fce6a978781c25c\` FOREIGN KEY (\`flashcardId\`) REFERENCES \`flashcard\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`card_pronunciation_result\` ADD CONSTRAINT \`FK_514b104a3c9371c68cb4e0d2293\` FOREIGN KEY (\`userId\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`card_learned\` ADD CONSTRAINT \`FK_ee9c6dac84f64cddd948b736249\` FOREIGN KEY (\`flashcardId\`) REFERENCES \`flashcard\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`card_learned\` ADD CONSTRAINT \`FK_4870179d8de99fc033fce47a05b\` FOREIGN KEY (\`userId\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`flashcard\` ADD CONSTRAINT \`FK_96c9abdc2bdfc306e956b095629\` FOREIGN KEY (\`folderFlashcardId\`) REFERENCES \`folder_flashcard\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`folder_flashcard\` ADD CONSTRAINT \`FK_905211ef1f78e204b100ab23902\` FOREIGN KEY (\`userId\`) REFERENCES \`user\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`user_achievement\` ADD CONSTRAINT \`FK_2a418515c335cab7c5ba70c28b3\` FOREIGN KEY (\`userId\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`user_achievement\` ADD CONSTRAINT \`FK_843ecd1965f1aac694875674a18\` FOREIGN KEY (\`achievementId\`) REFERENCES \`achievement\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`avatar\` ADD CONSTRAINT \`FK_b6abb9e4579bb7fca4d823a5e66\` FOREIGN KEY (\`userId\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`feedback\` ADD CONSTRAINT \`FK_4a39e6ac0cecdf18307a365cf3c\` FOREIGN KEY (\`userId\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`staff_experience\` ADD CONSTRAINT \`FK_0b7d1ebb48f77c3dccdaacd69f4\` FOREIGN KEY (\`staffProfileId\`) REFERENCES \`staff_profile\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`staff_profile\` ADD CONSTRAINT \`FK_dcf4c54c6e051cb725aa69304df\` FOREIGN KEY (\`userId\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`phone_assessment\` ADD CONSTRAINT \`FK_dc3f7ea676816d91fefb757fe5c\` FOREIGN KEY (\`word_assessment_id\`) REFERENCES \`word_assessment\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`word_assessment\` ADD CONSTRAINT \`FK_751f29c87b2d68c6bf77ba07fdb\` FOREIGN KEY (\`result_pronunciation_id\`) REFERENCES \`result_pronunciation_exercise\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`result_pronunciation_exercise\` ADD CONSTRAINT \`FK_296ff348a9142ba3306613d54d5\` FOREIGN KEY (\`exerciseId\`) REFERENCES \`pronunciation_exercise\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`result_pronunciation_exercise\` ADD CONSTRAINT \`FK_edbc88f0f63debf5eef933ed158\` FOREIGN KEY (\`userId\`) REFERENCES \`user\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`pronunciation_exercise\` ADD CONSTRAINT \`FK_eeb8da9aa5577afd86fb6a5d3c2\` FOREIGN KEY (\`episodeId\`) REFERENCES \`episode\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`result_identification_exercise\` ADD CONSTRAINT \`FK_0e6d43b2707f015fa8c4ddf2f81\` FOREIGN KEY (\`exerciseId\`) REFERENCES \`identification_exercise\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`result_identification_exercise\` ADD CONSTRAINT \`FK_a0ae8f2749a85435a525313bfe0\` FOREIGN KEY (\`userId\`) REFERENCES \`user\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`identification_exercise\` ADD CONSTRAINT \`FK_f88c3bd7d068bbf7d736ff8158c\` FOREIGN KEY (\`episodeId\`) REFERENCES \`episode\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`episode\` ADD CONSTRAINT \`FK_9e77d73d92bbdef518fba403c44\` FOREIGN KEY (\`pronunciationCourseId\`) REFERENCES \`pronunciation_course\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`participant_in_course\` ADD CONSTRAINT \`FK_16525afc8c1d73a99aa0a70006a\` FOREIGN KEY (\`participantId\`) REFERENCES \`user\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`participant_in_course\` ADD CONSTRAINT \`FK_3411b543fdb92326c99e014cd9e\` FOREIGN KEY (\`courseId\`) REFERENCES \`pronunciation_course\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`pronunciation_course\` ADD CONSTRAINT \`FK_fd5d61d122a5e318d7835f66e96\` FOREIGN KEY (\`creatorId\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`user\` ADD CONSTRAINT \`FK_c28e52f758e7bbc53828db92194\` FOREIGN KEY (\`roleId\`) REFERENCES \`role\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`user\` DROP FOREIGN KEY \`FK_c28e52f758e7bbc53828db92194\``);
        await queryRunner.query(`ALTER TABLE \`pronunciation_course\` DROP FOREIGN KEY \`FK_fd5d61d122a5e318d7835f66e96\``);
        await queryRunner.query(`ALTER TABLE \`participant_in_course\` DROP FOREIGN KEY \`FK_3411b543fdb92326c99e014cd9e\``);
        await queryRunner.query(`ALTER TABLE \`participant_in_course\` DROP FOREIGN KEY \`FK_16525afc8c1d73a99aa0a70006a\``);
        await queryRunner.query(`ALTER TABLE \`episode\` DROP FOREIGN KEY \`FK_9e77d73d92bbdef518fba403c44\``);
        await queryRunner.query(`ALTER TABLE \`identification_exercise\` DROP FOREIGN KEY \`FK_f88c3bd7d068bbf7d736ff8158c\``);
        await queryRunner.query(`ALTER TABLE \`result_identification_exercise\` DROP FOREIGN KEY \`FK_a0ae8f2749a85435a525313bfe0\``);
        await queryRunner.query(`ALTER TABLE \`result_identification_exercise\` DROP FOREIGN KEY \`FK_0e6d43b2707f015fa8c4ddf2f81\``);
        await queryRunner.query(`ALTER TABLE \`pronunciation_exercise\` DROP FOREIGN KEY \`FK_eeb8da9aa5577afd86fb6a5d3c2\``);
        await queryRunner.query(`ALTER TABLE \`result_pronunciation_exercise\` DROP FOREIGN KEY \`FK_edbc88f0f63debf5eef933ed158\``);
        await queryRunner.query(`ALTER TABLE \`result_pronunciation_exercise\` DROP FOREIGN KEY \`FK_296ff348a9142ba3306613d54d5\``);
        await queryRunner.query(`ALTER TABLE \`word_assessment\` DROP FOREIGN KEY \`FK_751f29c87b2d68c6bf77ba07fdb\``);
        await queryRunner.query(`ALTER TABLE \`phone_assessment\` DROP FOREIGN KEY \`FK_dc3f7ea676816d91fefb757fe5c\``);
        await queryRunner.query(`ALTER TABLE \`staff_profile\` DROP FOREIGN KEY \`FK_dcf4c54c6e051cb725aa69304df\``);
        await queryRunner.query(`ALTER TABLE \`staff_experience\` DROP FOREIGN KEY \`FK_0b7d1ebb48f77c3dccdaacd69f4\``);
        await queryRunner.query(`ALTER TABLE \`feedback\` DROP FOREIGN KEY \`FK_4a39e6ac0cecdf18307a365cf3c\``);
        await queryRunner.query(`ALTER TABLE \`avatar\` DROP FOREIGN KEY \`FK_b6abb9e4579bb7fca4d823a5e66\``);
        await queryRunner.query(`ALTER TABLE \`user_achievement\` DROP FOREIGN KEY \`FK_843ecd1965f1aac694875674a18\``);
        await queryRunner.query(`ALTER TABLE \`user_achievement\` DROP FOREIGN KEY \`FK_2a418515c335cab7c5ba70c28b3\``);
        await queryRunner.query(`ALTER TABLE \`folder_flashcard\` DROP FOREIGN KEY \`FK_905211ef1f78e204b100ab23902\``);
        await queryRunner.query(`ALTER TABLE \`flashcard\` DROP FOREIGN KEY \`FK_96c9abdc2bdfc306e956b095629\``);
        await queryRunner.query(`ALTER TABLE \`card_learned\` DROP FOREIGN KEY \`FK_4870179d8de99fc033fce47a05b\``);
        await queryRunner.query(`ALTER TABLE \`card_learned\` DROP FOREIGN KEY \`FK_ee9c6dac84f64cddd948b736249\``);
        await queryRunner.query(`ALTER TABLE \`card_pronunciation_result\` DROP FOREIGN KEY \`FK_514b104a3c9371c68cb4e0d2293\``);
        await queryRunner.query(`ALTER TABLE \`card_pronunciation_result\` DROP FOREIGN KEY \`FK_5cca1b053ba7fce6a978781c25c\``);
        await queryRunner.query(`ALTER TABLE \`pronunciation_course\` CHANGE \`creatorId\` \`creatorId\` int NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`pronunciation_course\` CHANGE \`poster_id\` \`poster_id\` varchar(255) NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`pronunciation_course\` CHANGE \`poster\` \`poster\` varchar(255) NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`episode\` CHANGE \`video_file_name\` \`video_file_name\` varchar(255) NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`episode\` CHANGE \`video_url\` \`video_url\` varchar(255) NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`episode\` CHANGE \`fundamentals\` \`fundamentals\` text NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`word_assessment\` CHANGE \`result_pronunciation_id\` \`result_pronunciation_id\` int NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`staff_profile\` CHANGE \`userId\` \`userId\` int NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`staff_experience\` CHANGE \`staffProfileId\` \`staffProfileId\` int NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`folder_flashcard\` CHANGE \`description\` \`description\` varchar(255) NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`flashcard\` CHANGE \`dueDate\` \`dueDate\` date NOT NULL DEFAULT CURRENT_TIMESTAMP()`);
        await queryRunner.query(`ALTER TABLE \`flashcard\` CHANGE \`example\` \`example\` varchar(200) NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`flashcard\` CHANGE \`meaning\` \`meaning\` varchar(100) NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`card_learned\` CHANGE \`learned_at\` \`learned_at\` date NOT NULL DEFAULT CURRENT_TIMESTAMP()`);
        await queryRunner.query(`DROP INDEX \`IDX_78a916df40e02a9deb1c4b75ed\` ON \`user\``);
        await queryRunner.query(`DROP INDEX \`IDX_01eea41349b6c9275aec646eee\` ON \`user\``);
        await queryRunner.query(`DROP TABLE \`user\``);
    }

}
