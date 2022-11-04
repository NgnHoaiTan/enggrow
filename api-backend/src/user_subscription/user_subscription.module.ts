import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserSubscription } from './user_subscription.entity';

@Module({
    imports: [
        TypeOrmModule.forFeature([UserSubscription])
    ],
    exports: [TypeOrmModule],
})
export class UserSubscriptionModule {}
