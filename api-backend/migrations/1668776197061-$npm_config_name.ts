import { MigrationInterface, QueryRunner } from "typeorm";

export class $npmConfigName1668776197061 implements MigrationInterface {
    name = '$npmConfigName1668776197061'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`user\` DROP FOREIGN KEY \`FK_c28e52f758e7bbc53828db92194\``);
        await queryRunner.query(`ALTER TABLE \`user\` ADD \`email\` varchar(50) NULL`);
        await queryRunner.query(`ALTER TABLE \`user\` ADD UNIQUE INDEX \`IDX_e12875dfb3b1d92d7d7c5377e2\` (\`email\`)`);
        await queryRunner.query(`ALTER TABLE \`card_learned\` CHANGE \`learned_at\` \`learned_at\` date NOT NULL DEFAULT CURRENT_TIMESTAMP`);
        await queryRunner.query(`ALTER TABLE \`flashcard\` CHANGE \`meaning\` \`meaning\` varchar(100) NULL`);
        await queryRunner.query(`ALTER TABLE \`flashcard\` CHANGE \`example\` \`example\` varchar(200) NULL`);
        await queryRunner.query(`ALTER TABLE \`flashcard\` CHANGE \`dueDate\` \`dueDate\` date NOT NULL DEFAULT CURRENT_TIMESTAMP`);
        await queryRunner.query(`ALTER TABLE \`folder_flashcard\` CHANGE \`description\` \`description\` varchar(255) NULL`);
        await queryRunner.query(`ALTER TABLE \`staff_experience\` DROP FOREIGN KEY \`FK_0b7d1ebb48f77c3dccdaacd69f4\``);
        await queryRunner.query(`ALTER TABLE \`staff_experience\` CHANGE \`staffProfileId\` \`staffProfileId\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`staff_profile\` DROP FOREIGN KEY \`FK_dcf4c54c6e051cb725aa69304df\``);
        await queryRunner.query(`ALTER TABLE \`staff_profile\` CHANGE \`userId\` \`userId\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`word_assessment\` DROP FOREIGN KEY \`FK_751f29c87b2d68c6bf77ba07fdb\``);
        await queryRunner.query(`ALTER TABLE \`word_assessment\` CHANGE \`result_pronunciation_id\` \`result_pronunciation_id\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`episode\` CHANGE \`fundamentals\` \`fundamentals\` text NULL`);
        await queryRunner.query(`ALTER TABLE \`episode\` CHANGE \`video_url\` \`video_url\` varchar(255) NULL`);
        await queryRunner.query(`ALTER TABLE \`episode\` CHANGE \`video_file_name\` \`video_file_name\` varchar(255) NULL`);
        await queryRunner.query(`ALTER TABLE \`pronunciation_course\` DROP FOREIGN KEY \`FK_fd5d61d122a5e318d7835f66e96\``);
        await queryRunner.query(`ALTER TABLE \`pronunciation_course\` CHANGE \`poster\` \`poster\` varchar(255) NULL`);
        await queryRunner.query(`ALTER TABLE \`pronunciation_course\` CHANGE \`poster_id\` \`poster_id\` varchar(255) NULL`);
        await queryRunner.query(`ALTER TABLE \`pronunciation_course\` CHANGE \`creatorId\` \`creatorId\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`user\` CHANGE \`bio\` \`bio\` varchar(100) NULL`);
        await queryRunner.query(`ALTER TABLE \`user\` CHANGE \`address\` \`address\` varchar(255) NULL`);
        await queryRunner.query(`ALTER TABLE \`user\` CHANGE \`phone_number\` \`phone_number\` varchar(11) NULL`);
        await queryRunner.query(`ALTER TABLE \`user\` CHANGE \`dob\` \`dob\` datetime NULL`);
        await queryRunner.query(`ALTER TABLE \`user\` CHANGE \`roleId\` \`roleId\` int NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`staff_experience\` ADD CONSTRAINT \`FK_0b7d1ebb48f77c3dccdaacd69f4\` FOREIGN KEY (\`staffProfileId\`) REFERENCES \`staff_profile\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`staff_profile\` ADD CONSTRAINT \`FK_dcf4c54c6e051cb725aa69304df\` FOREIGN KEY (\`userId\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`word_assessment\` ADD CONSTRAINT \`FK_751f29c87b2d68c6bf77ba07fdb\` FOREIGN KEY (\`result_pronunciation_id\`) REFERENCES \`result_pronunciation_exercise\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`pronunciation_course\` ADD CONSTRAINT \`FK_fd5d61d122a5e318d7835f66e96\` FOREIGN KEY (\`creatorId\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`user\` ADD CONSTRAINT \`FK_c28e52f758e7bbc53828db92194\` FOREIGN KEY (\`roleId\`) REFERENCES \`role\`(\`id\`) ON DELETE NO ACTION ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`user\` DROP FOREIGN KEY \`FK_c28e52f758e7bbc53828db92194\``);
        await queryRunner.query(`ALTER TABLE \`pronunciation_course\` DROP FOREIGN KEY \`FK_fd5d61d122a5e318d7835f66e96\``);
        await queryRunner.query(`ALTER TABLE \`word_assessment\` DROP FOREIGN KEY \`FK_751f29c87b2d68c6bf77ba07fdb\``);
        await queryRunner.query(`ALTER TABLE \`staff_profile\` DROP FOREIGN KEY \`FK_dcf4c54c6e051cb725aa69304df\``);
        await queryRunner.query(`ALTER TABLE \`staff_experience\` DROP FOREIGN KEY \`FK_0b7d1ebb48f77c3dccdaacd69f4\``);
        await queryRunner.query(`ALTER TABLE \`user\` CHANGE \`roleId\` \`roleId\` int NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`user\` CHANGE \`dob\` \`dob\` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP()`);
        await queryRunner.query(`ALTER TABLE \`user\` CHANGE \`phone_number\` \`phone_number\` varchar(11) NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`user\` CHANGE \`address\` \`address\` varchar(255) NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`user\` CHANGE \`bio\` \`bio\` varchar(100) NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`pronunciation_course\` CHANGE \`creatorId\` \`creatorId\` int NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`pronunciation_course\` CHANGE \`poster_id\` \`poster_id\` varchar(255) NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`pronunciation_course\` CHANGE \`poster\` \`poster\` varchar(255) NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`pronunciation_course\` ADD CONSTRAINT \`FK_fd5d61d122a5e318d7835f66e96\` FOREIGN KEY (\`creatorId\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`episode\` CHANGE \`video_file_name\` \`video_file_name\` varchar(255) NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`episode\` CHANGE \`video_url\` \`video_url\` varchar(255) NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`episode\` CHANGE \`fundamentals\` \`fundamentals\` text NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`word_assessment\` CHANGE \`result_pronunciation_id\` \`result_pronunciation_id\` int NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`word_assessment\` ADD CONSTRAINT \`FK_751f29c87b2d68c6bf77ba07fdb\` FOREIGN KEY (\`result_pronunciation_id\`) REFERENCES \`result_pronunciation_exercise\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`staff_profile\` CHANGE \`userId\` \`userId\` int NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`staff_profile\` ADD CONSTRAINT \`FK_dcf4c54c6e051cb725aa69304df\` FOREIGN KEY (\`userId\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`staff_experience\` CHANGE \`staffProfileId\` \`staffProfileId\` int NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`staff_experience\` ADD CONSTRAINT \`FK_0b7d1ebb48f77c3dccdaacd69f4\` FOREIGN KEY (\`staffProfileId\`) REFERENCES \`staff_profile\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`folder_flashcard\` CHANGE \`description\` \`description\` varchar(255) NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`flashcard\` CHANGE \`dueDate\` \`dueDate\` date NOT NULL DEFAULT CURRENT_TIMESTAMP()`);
        await queryRunner.query(`ALTER TABLE \`flashcard\` CHANGE \`example\` \`example\` varchar(200) NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`flashcard\` CHANGE \`meaning\` \`meaning\` varchar(100) NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`card_learned\` CHANGE \`learned_at\` \`learned_at\` date NOT NULL DEFAULT CURRENT_TIMESTAMP()`);
        await queryRunner.query(`ALTER TABLE \`user\` DROP INDEX \`IDX_e12875dfb3b1d92d7d7c5377e2\``);
        await queryRunner.query(`ALTER TABLE \`user\` DROP COLUMN \`email\``);
        await queryRunner.query(`ALTER TABLE \`user\` ADD CONSTRAINT \`FK_c28e52f758e7bbc53828db92194\` FOREIGN KEY (\`roleId\`) REFERENCES \`role\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
