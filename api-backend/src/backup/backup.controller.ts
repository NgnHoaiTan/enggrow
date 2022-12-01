import { Body, Controller, Post, Request, Res, UseGuards } from '@nestjs/common';
import { BackupService } from './backup.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('backup')
export class BackupController {
    constructor(
        private readonly backupService: BackupService
    ){}

    @UseGuards(JwtAuthGuard)
    @Post('')
    async handleManuallyBackupDatabase(@Request() req, @Res() response, @Body() data: any){
        try {
            const result = await this.backupService.handleManuallyBackupDatabase()
            return response.status(200).json(result)
        }catch(error){
            if (!error.status) {
                throw new Error(error)
            }
            else if(error.message) {
                return response.status(error.status).json(error)
            }
            return response.status(error.status).json(error)
        }
    }
}
