import { User } from '../user/user.entity';
import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, ManyToOne, OneToMany, ManyToMany, PrimaryColumn } from 'typeorm';
import { SubscriptionPlan } from '../subscription_plan/subscription_plan.entity';


@Entity()
export class UserSubscription {
    @PrimaryGeneratedColumn()
    id:number

    @ManyToOne(()=>User, (user)=>user.user_subscription,{nullable:false})
    user: User

    @ManyToOne(()=>SubscriptionPlan, (subscription)=>subscription.user_subscription,{nullable:false})
    subscription_plan: SubscriptionPlan

    @Column({type:'datetime'})
    start_at: Date

    @Column({type:'datetime'})
    end_at: Date

    @Column()
    status: boolean;
}