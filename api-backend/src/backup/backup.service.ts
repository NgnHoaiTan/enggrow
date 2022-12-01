import { Injectable } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import mysqldump from 'mysqldump'
import * as dayjs from 'dayjs'
const fs = require('fs')
const spawn = require('child_process').spawn

@Injectable()
export class BackupService {

    async handleManuallyBackupDatabase() {
        try {
            const fileName = `${process.env.DBMYSQL_DB}_${dayjs(new Date()).format('YYYY_MM_DD_hh_mm_ss')}.sql`
            console.log('Running Database Backup Cron Job')
            await mysqldump({
                connection: {
                    host: process.env.DBMYSQL_HOST,
                    user: process.env.DBMYSQL_USER,
                    password: '',
                    database: process.env.DBMYSQL_DB,
                },
                dumpToFile: `./backup/${fileName}`,
            });
            return {
                result: 'success',
                path: `./backup/${fileName}`
            }
        } catch (error) {
            throw new Error(error)
        }
    }

    @Cron(CronExpression.EVERY_WEEKDAY)
    handleAutomaticBackupDatabase() {
        try {
            console.log(dayjs(new Date()).format('YYYY_MM_DD_hh_mm_ss'))
            const fileName = `${process.env.DBMYSQL_DB}_${dayjs(new Date()).format('YYYY_MM_DD_hh_mm_ss')}.sql`
            // const wstream = fs.createWriteStream(`./backup/${fileName}`)
            console.log('Running Database Backup Cron Job')
            // const mysqldump = spawn('mysqldump', ['-u', process.env.DBMYSQL_USER, process.env.DBMYSQL_DB], {shell: true})
            // mysqldump
            //     .stdout
            //     .pipe(wstream)
            //     .on('finish', () => {
            //         console.log('DB Backup Completed!')
            //     })
            //     .on('error', (err) => {
            //         console.log('erorr here')
            //         console.log(err)
            //     })
            mysqldump({
                connection: {
                    host: process.env.DBMYSQL_HOST,
                    user: process.env.DBMYSQL_USER,
                    password: '',
                    database: process.env.DBMYSQL_DB,
                },
                dumpToFile: `./backup/${fileName}`,
            });
        } catch (error) {
            throw new Error(error)
        }
    }
}
