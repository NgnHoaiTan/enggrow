import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserService } from '../user/user.service';
import { Repository } from 'typeorm';
import { Notification } from './notification.entity';
var cron = require('node-cron');
@Injectable()
export class NotificationService {
    constructor(
        @InjectRepository(Notification)
        private notiRepository: Repository<Notification>,
        private userSerive: UserService,
        
    ){}

    // async getNotiUser() {
    //     try{
    //         const result = await this.
    //     }catch(error){
    //         console.log(error)
    //     }
    // }
}
