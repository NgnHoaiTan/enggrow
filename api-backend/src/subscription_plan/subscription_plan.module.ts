import { Module } from '@nestjs/common';
import { SubscriptionPlanService } from './subscription_plan.service';
import { SubscriptionPlanController } from './subscription_plan.controller';
import { SubscriptionPlan } from './subscription_plan.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forFeature([SubscriptionPlan])
  ],
  exports: [TypeOrmModule],
  providers: [SubscriptionPlanService],
  controllers: [SubscriptionPlanController]
})
export class SubscriptionPlanModule { }
