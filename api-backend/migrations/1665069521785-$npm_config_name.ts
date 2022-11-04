import { MigrationInterface, QueryRunner } from "typeorm";

export class $npmConfigName1665069521785 implements MigrationInterface {
    name = '$npmConfigName1665069521785'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`user\` ADD \`googleId\` varchar(255) NULL`);
        await queryRunner.query(`ALTER TABLE \`flashcard\` CHANGE \`meaning\` \`meaning\` varchar(100) NULL`);
        await queryRunner.query(`ALTER TABLE \`flashcard\` CHANGE \`image\` \`image\` varchar(255) NULL`);
        await queryRunner.query(`ALTER TABLE \`flashcard\` CHANGE \`audio\` \`audio\` varchar(255) NULL`);
        await queryRunner.query(`ALTER TABLE \`staff_experience\` DROP FOREIGN KEY \`FK_0b7d1ebb48f77c3dccdaacd69f4\``);
        await queryRunner.query(`ALTER TABLE \`staff_experience\` CHANGE \`staffProfileId\` \`staffProfileId\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`staff_profile\` DROP FOREIGN KEY \`FK_dcf4c54c6e051cb725aa69304df\``);
        await queryRunner.query(`ALTER TABLE \`staff_profile\` CHANGE \`userId\` \`userId\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`pronunciation_practice\` DROP FOREIGN KEY \`FK_41b78889d031703a1f4850b46c2\``);
        await queryRunner.query(`ALTER TABLE \`pronunciation_practice\` DROP FOREIGN KEY \`FK_7720ab04fc661b9301e35c81ba4\``);
        await queryRunner.query(`ALTER TABLE \`pronunciation_practice\` CHANGE \`creatorId\` \`creatorId\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`pronunciation_practice\` CHANGE \`levelId\` \`levelId\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`member_course\` DROP FOREIGN KEY \`FK_eca9ccaa9fd135cbc5454b8b837\``);
        await queryRunner.query(`ALTER TABLE \`member_course\` DROP FOREIGN KEY \`FK_70cba9355b6baae1fd4b24c9e94\``);
        await queryRunner.query(`ALTER TABLE \`member_course\` CHANGE \`studentId\` \`studentId\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`member_course\` CHANGE \`livecourseId\` \`livecourseId\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`live_course\` DROP FOREIGN KEY \`FK_3288d1aaf106a1b07d09b5258f5\``);
        await queryRunner.query(`ALTER TABLE \`live_course\` DROP FOREIGN KEY \`FK_daa784d4534061040a307eacc9d\``);
        await queryRunner.query(`ALTER TABLE \`live_course\` CHANGE \`slots\` \`slots\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`live_course\` CHANGE \`teacherId\` \`teacherId\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`live_course\` CHANGE \`levelId\` \`levelId\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`reels\` DROP FOREIGN KEY \`FK_820c8217367f2a5e30d2578741a\``);
        await queryRunner.query(`ALTER TABLE \`reels\` CHANGE \`creatorId\` \`creatorId\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`notification\` DROP FOREIGN KEY \`FK_1ced25315eb974b73391fb1c81b\``);
        await queryRunner.query(`ALTER TABLE \`notification\` CHANGE \`userId\` \`userId\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`user\` DROP FOREIGN KEY \`FK_c28e52f758e7bbc53828db92194\``);
        await queryRunner.query(`ALTER TABLE \`user\` CHANGE \`bio\` \`bio\` varchar(255) NULL`);
        await queryRunner.query(`ALTER TABLE \`user\` CHANGE \`address\` \`address\` varchar(255) NULL`);
        await queryRunner.query(`ALTER TABLE \`user\` CHANGE \`phone_number\` \`phone_number\` varchar(11) NULL`);
        await queryRunner.query(`ALTER TABLE \`user\` CHANGE \`username\` \`username\` varchar(16) NULL`);
        await queryRunner.query(`ALTER TABLE \`user\` CHANGE \`password\` \`password\` varchar(16) NULL`);
        await queryRunner.query(`ALTER TABLE \`user\` CHANGE \`dob\` \`dob\` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP`);
        await queryRunner.query(`ALTER TABLE \`user\` CHANGE \`roleId\` \`roleId\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`staff_experience\` ADD CONSTRAINT \`FK_0b7d1ebb48f77c3dccdaacd69f4\` FOREIGN KEY (\`staffProfileId\`) REFERENCES \`staff_profile\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`staff_profile\` ADD CONSTRAINT \`FK_dcf4c54c6e051cb725aa69304df\` FOREIGN KEY (\`userId\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`pronunciation_practice\` ADD CONSTRAINT \`FK_41b78889d031703a1f4850b46c2\` FOREIGN KEY (\`creatorId\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`pronunciation_practice\` ADD CONSTRAINT \`FK_7720ab04fc661b9301e35c81ba4\` FOREIGN KEY (\`levelId\`) REFERENCES \`level\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`member_course\` ADD CONSTRAINT \`FK_eca9ccaa9fd135cbc5454b8b837\` FOREIGN KEY (\`studentId\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`member_course\` ADD CONSTRAINT \`FK_70cba9355b6baae1fd4b24c9e94\` FOREIGN KEY (\`livecourseId\`) REFERENCES \`live_course\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`live_course\` ADD CONSTRAINT \`FK_3288d1aaf106a1b07d09b5258f5\` FOREIGN KEY (\`teacherId\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`live_course\` ADD CONSTRAINT \`FK_daa784d4534061040a307eacc9d\` FOREIGN KEY (\`levelId\`) REFERENCES \`level\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`reels\` ADD CONSTRAINT \`FK_820c8217367f2a5e30d2578741a\` FOREIGN KEY (\`creatorId\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`notification\` ADD CONSTRAINT \`FK_1ced25315eb974b73391fb1c81b\` FOREIGN KEY (\`userId\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`user\` ADD CONSTRAINT \`FK_c28e52f758e7bbc53828db92194\` FOREIGN KEY (\`roleId\`) REFERENCES \`role\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`user\` DROP FOREIGN KEY \`FK_c28e52f758e7bbc53828db92194\``);
        await queryRunner.query(`ALTER TABLE \`notification\` DROP FOREIGN KEY \`FK_1ced25315eb974b73391fb1c81b\``);
        await queryRunner.query(`ALTER TABLE \`reels\` DROP FOREIGN KEY \`FK_820c8217367f2a5e30d2578741a\``);
        await queryRunner.query(`ALTER TABLE \`live_course\` DROP FOREIGN KEY \`FK_daa784d4534061040a307eacc9d\``);
        await queryRunner.query(`ALTER TABLE \`live_course\` DROP FOREIGN KEY \`FK_3288d1aaf106a1b07d09b5258f5\``);
        await queryRunner.query(`ALTER TABLE \`member_course\` DROP FOREIGN KEY \`FK_70cba9355b6baae1fd4b24c9e94\``);
        await queryRunner.query(`ALTER TABLE \`member_course\` DROP FOREIGN KEY \`FK_eca9ccaa9fd135cbc5454b8b837\``);
        await queryRunner.query(`ALTER TABLE \`pronunciation_practice\` DROP FOREIGN KEY \`FK_7720ab04fc661b9301e35c81ba4\``);
        await queryRunner.query(`ALTER TABLE \`pronunciation_practice\` DROP FOREIGN KEY \`FK_41b78889d031703a1f4850b46c2\``);
        await queryRunner.query(`ALTER TABLE \`staff_profile\` DROP FOREIGN KEY \`FK_dcf4c54c6e051cb725aa69304df\``);
        await queryRunner.query(`ALTER TABLE \`staff_experience\` DROP FOREIGN KEY \`FK_0b7d1ebb48f77c3dccdaacd69f4\``);
        await queryRunner.query(`ALTER TABLE \`user\` CHANGE \`roleId\` \`roleId\` int NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`user\` CHANGE \`dob\` \`dob\` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP()`);
        await queryRunner.query(`ALTER TABLE \`user\` CHANGE \`password\` \`password\` varchar(16) NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`user\` CHANGE \`username\` \`username\` varchar(16) NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`user\` CHANGE \`phone_number\` \`phone_number\` varchar(11) NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`user\` CHANGE \`address\` \`address\` varchar(255) NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`user\` CHANGE \`bio\` \`bio\` varchar(255) NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`user\` ADD CONSTRAINT \`FK_c28e52f758e7bbc53828db92194\` FOREIGN KEY (\`roleId\`) REFERENCES \`role\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`notification\` CHANGE \`userId\` \`userId\` int NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`notification\` ADD CONSTRAINT \`FK_1ced25315eb974b73391fb1c81b\` FOREIGN KEY (\`userId\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`reels\` CHANGE \`creatorId\` \`creatorId\` int NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`reels\` ADD CONSTRAINT \`FK_820c8217367f2a5e30d2578741a\` FOREIGN KEY (\`creatorId\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`live_course\` CHANGE \`levelId\` \`levelId\` int NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`live_course\` CHANGE \`teacherId\` \`teacherId\` int NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`live_course\` CHANGE \`slots\` \`slots\` int NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`live_course\` ADD CONSTRAINT \`FK_daa784d4534061040a307eacc9d\` FOREIGN KEY (\`levelId\`) REFERENCES \`level\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`live_course\` ADD CONSTRAINT \`FK_3288d1aaf106a1b07d09b5258f5\` FOREIGN KEY (\`teacherId\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`member_course\` CHANGE \`livecourseId\` \`livecourseId\` int NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`member_course\` CHANGE \`studentId\` \`studentId\` int NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`member_course\` ADD CONSTRAINT \`FK_70cba9355b6baae1fd4b24c9e94\` FOREIGN KEY (\`livecourseId\`) REFERENCES \`live_course\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`member_course\` ADD CONSTRAINT \`FK_eca9ccaa9fd135cbc5454b8b837\` FOREIGN KEY (\`studentId\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`pronunciation_practice\` CHANGE \`levelId\` \`levelId\` int NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`pronunciation_practice\` CHANGE \`creatorId\` \`creatorId\` int NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`pronunciation_practice\` ADD CONSTRAINT \`FK_7720ab04fc661b9301e35c81ba4\` FOREIGN KEY (\`levelId\`) REFERENCES \`level\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`pronunciation_practice\` ADD CONSTRAINT \`FK_41b78889d031703a1f4850b46c2\` FOREIGN KEY (\`creatorId\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`staff_profile\` CHANGE \`userId\` \`userId\` int NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`staff_profile\` ADD CONSTRAINT \`FK_dcf4c54c6e051cb725aa69304df\` FOREIGN KEY (\`userId\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`staff_experience\` CHANGE \`staffProfileId\` \`staffProfileId\` int NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`staff_experience\` ADD CONSTRAINT \`FK_0b7d1ebb48f77c3dccdaacd69f4\` FOREIGN KEY (\`staffProfileId\`) REFERENCES \`staff_profile\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`flashcard\` CHANGE \`audio\` \`audio\` varchar(255) NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`flashcard\` CHANGE \`image\` \`image\` varchar(255) NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`flashcard\` CHANGE \`meaning\` \`meaning\` varchar(100) NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`user\` DROP COLUMN \`googleId\``);
    }

}
