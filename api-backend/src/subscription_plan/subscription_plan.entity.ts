import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { UserSubscription } from '../user_subscription/user_subscription.entity';

@Entity()
export class SubscriptionPlan {
    @PrimaryGeneratedColumn()
    id: number

    @Column('varchar',{length:50})
    name: string

    @Column('text')
    description: string

    @Column()
    price: number

    @Column()
    price_discount: number

    @Column({type:'datetime' })
    discount_to_date: Date

    @Column()
    duration: number

    @OneToMany(()=>UserSubscription, (user_subscription)=>user_subscription.subscription_plan,{nullable:false})
    user_subscription: UserSubscription[]
}