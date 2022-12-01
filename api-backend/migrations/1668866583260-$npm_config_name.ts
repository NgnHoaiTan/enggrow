import { MigrationInterface, QueryRunner } from "typeorm";

export class $npmConfigName1668866583260 implements MigrationInterface {
    name = '$npmConfigName1668866583260'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`card_learned\` CHANGE \`learned_at\` \`learned_at\` date NOT NULL DEFAULT CURRENT_TIMESTAMP`);
        await queryRunner.query(`ALTER TABLE \`flashcard\` CHANGE \`meaning\` \`meaning\` varchar(50) NULL`);
        await queryRunner.query(`ALTER TABLE \`flashcard\` CHANGE \`example\` \`example\` varchar(30) NULL`);
        await queryRunner.query(`ALTER TABLE \`flashcard\` CHANGE \`dueDate\` \`dueDate\` date NOT NULL DEFAULT CURRENT_TIMESTAMP`);
        await queryRunner.query(`ALTER TABLE \`avatar\` DROP COLUMN \`image_url\``);
        await queryRunner.query(`ALTER TABLE \`avatar\` ADD \`image_url\` varchar(120) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`avatar\` DROP COLUMN \`image_id\``);
        await queryRunner.query(`ALTER TABLE \`avatar\` ADD \`image_id\` varchar(60) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`staff_experience\` DROP FOREIGN KEY \`FK_0b7d1ebb48f77c3dccdaacd69f4\``);
        await queryRunner.query(`ALTER TABLE \`staff_experience\` CHANGE \`staffProfileId\` \`staffProfileId\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`staff_profile\` DROP COLUMN \`certification_url\``);
        await queryRunner.query(`ALTER TABLE \`staff_profile\` ADD \`certification_url\` varchar(120) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`staff_profile\` DROP COLUMN \`certification_id\``);
        await queryRunner.query(`ALTER TABLE \`staff_profile\` ADD \`certification_id\` varchar(60) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`word_assessment\` DROP FOREIGN KEY \`FK_751f29c87b2d68c6bf77ba07fdb\``);
        await queryRunner.query(`ALTER TABLE \`word_assessment\` CHANGE \`result_pronunciation_id\` \`result_pronunciation_id\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`episode\` CHANGE \`fundamentals\` \`fundamentals\` text NULL`);
        await queryRunner.query(`ALTER TABLE \`episode\` CHANGE \`video_url\` \`video_url\` varchar(100) NULL`);
        await queryRunner.query(`ALTER TABLE \`episode\` CHANGE \`video_id\` \`video_id\` varchar(30) NULL`);
        await queryRunner.query(`ALTER TABLE \`pronunciation_course\` DROP FOREIGN KEY \`FK_fd5d61d122a5e318d7835f66e96\``);
        await queryRunner.query(`ALTER TABLE \`pronunciation_course\` CHANGE \`poster\` \`poster\` varchar(100) NULL`);
        await queryRunner.query(`ALTER TABLE \`pronunciation_course\` CHANGE \`poster_id\` \`poster_id\` varchar(30) NULL`);
        await queryRunner.query(`ALTER TABLE \`pronunciation_course\` CHANGE \`creatorId\` \`creatorId\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`user\` DROP FOREIGN KEY \`FK_801282d422e1568ed4e512a6871\``);
        await queryRunner.query(`ALTER TABLE \`user\` CHANGE \`address\` \`address\` varchar(60) NULL`);
        await queryRunner.query(`ALTER TABLE \`user\` DROP COLUMN \`current_avatar\``);
        await queryRunner.query(`ALTER TABLE \`user\` ADD \`current_avatar\` varchar(150) NOT NULL DEFAULT 'https://res.cloudinary.com/hoaitan/image/upload/v1668854027/engrow/no_avatar_gd2rni.jpg'`);
        await queryRunner.query(`ALTER TABLE \`user\` CHANGE \`email\` \`email\` varchar(50) NULL`);
        await queryRunner.query(`ALTER TABLE \`user\` CHANGE \`phone_number\` \`phone_number\` varchar(11) NULL`);
        await queryRunner.query(`ALTER TABLE \`user\` CHANGE \`dob\` \`dob\` datetime NULL`);
        await queryRunner.query(`ALTER TABLE \`user\` CHANGE \`last_online\` \`last_online\` datetime NULL`);
        await queryRunner.query(`ALTER TABLE \`user\` CHANGE \`staff_profileId\` \`staff_profileId\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`staff_experience\` ADD CONSTRAINT \`FK_0b7d1ebb48f77c3dccdaacd69f4\` FOREIGN KEY (\`staffProfileId\`) REFERENCES \`staff_profile\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`word_assessment\` ADD CONSTRAINT \`FK_751f29c87b2d68c6bf77ba07fdb\` FOREIGN KEY (\`result_pronunciation_id\`) REFERENCES \`result_pronunciation_exercise\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`pronunciation_course\` ADD CONSTRAINT \`FK_fd5d61d122a5e318d7835f66e96\` FOREIGN KEY (\`creatorId\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`user\` ADD CONSTRAINT \`FK_801282d422e1568ed4e512a6871\` FOREIGN KEY (\`staff_profileId\`) REFERENCES \`staff_profile\`(\`id\`) ON DELETE SET NULL ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`user\` DROP FOREIGN KEY \`FK_801282d422e1568ed4e512a6871\``);
        await queryRunner.query(`ALTER TABLE \`pronunciation_course\` DROP FOREIGN KEY \`FK_fd5d61d122a5e318d7835f66e96\``);
        await queryRunner.query(`ALTER TABLE \`word_assessment\` DROP FOREIGN KEY \`FK_751f29c87b2d68c6bf77ba07fdb\``);
        await queryRunner.query(`ALTER TABLE \`staff_experience\` DROP FOREIGN KEY \`FK_0b7d1ebb48f77c3dccdaacd69f4\``);
        await queryRunner.query(`ALTER TABLE \`user\` CHANGE \`staff_profileId\` \`staff_profileId\` int NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`user\` CHANGE \`last_online\` \`last_online\` datetime NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`user\` CHANGE \`dob\` \`dob\` datetime NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`user\` CHANGE \`phone_number\` \`phone_number\` varchar(11) NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`user\` CHANGE \`email\` \`email\` varchar(50) NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`user\` DROP COLUMN \`current_avatar\``);
        await queryRunner.query(`ALTER TABLE \`user\` ADD \`current_avatar\` varchar(100) NOT NULL DEFAULT ''https://res.cloudinary.com/hoaitan/image/upload/v1668854027/engrow/no_avatar_gd2rni.jpg''`);
        await queryRunner.query(`ALTER TABLE \`user\` CHANGE \`address\` \`address\` varchar(60) NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`user\` ADD CONSTRAINT \`FK_801282d422e1568ed4e512a6871\` FOREIGN KEY (\`staff_profileId\`) REFERENCES \`staff_profile\`(\`id\`) ON DELETE SET NULL ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE \`pronunciation_course\` CHANGE \`creatorId\` \`creatorId\` int NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`pronunciation_course\` CHANGE \`poster_id\` \`poster_id\` varchar(30) NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`pronunciation_course\` CHANGE \`poster\` \`poster\` varchar(100) NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`pronunciation_course\` ADD CONSTRAINT \`FK_fd5d61d122a5e318d7835f66e96\` FOREIGN KEY (\`creatorId\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`episode\` CHANGE \`video_id\` \`video_id\` varchar(30) NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`episode\` CHANGE \`video_url\` \`video_url\` varchar(100) NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`episode\` CHANGE \`fundamentals\` \`fundamentals\` text NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`word_assessment\` CHANGE \`result_pronunciation_id\` \`result_pronunciation_id\` int NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`word_assessment\` ADD CONSTRAINT \`FK_751f29c87b2d68c6bf77ba07fdb\` FOREIGN KEY (\`result_pronunciation_id\`) REFERENCES \`result_pronunciation_exercise\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`staff_profile\` DROP COLUMN \`certification_id\``);
        await queryRunner.query(`ALTER TABLE \`staff_profile\` ADD \`certification_id\` varchar(50) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`staff_profile\` DROP COLUMN \`certification_url\``);
        await queryRunner.query(`ALTER TABLE \`staff_profile\` ADD \`certification_url\` varchar(100) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`staff_experience\` CHANGE \`staffProfileId\` \`staffProfileId\` int NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`staff_experience\` ADD CONSTRAINT \`FK_0b7d1ebb48f77c3dccdaacd69f4\` FOREIGN KEY (\`staffProfileId\`) REFERENCES \`staff_profile\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`avatar\` DROP COLUMN \`image_id\``);
        await queryRunner.query(`ALTER TABLE \`avatar\` ADD \`image_id\` varchar(40) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`avatar\` DROP COLUMN \`image_url\``);
        await queryRunner.query(`ALTER TABLE \`avatar\` ADD \`image_url\` varchar(100) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`flashcard\` CHANGE \`dueDate\` \`dueDate\` date NOT NULL DEFAULT CURRENT_TIMESTAMP()`);
        await queryRunner.query(`ALTER TABLE \`flashcard\` CHANGE \`example\` \`example\` varchar(30) NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`flashcard\` CHANGE \`meaning\` \`meaning\` varchar(50) NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`card_learned\` CHANGE \`learned_at\` \`learned_at\` date NOT NULL DEFAULT CURRENT_TIMESTAMP()`);
    }

}
