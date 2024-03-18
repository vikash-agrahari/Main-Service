import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import {OrderService } from './order.service';
import { EntityModule } from 'src/entity/entity.module';
import { GuardModule } from 'src/guards/guards.module';
import { GuardService } from 'src/guards/guards.service';
import { HttpResponse } from 'src/common/httpResponse';
import { OrderController } from './order.controller';
import { UserOnBoardingService } from 'src/modules/user/on-boarding/on-boarding.service';
import { TransactionService } from '../transaction/transaction.service';
import { FirebaseService } from 'src/providers/firebase/firebase.service';
import { KafkaService } from 'src/providers/kafka/kafka.service';

@Module({
  imports: [ConfigModule.forRoot(),EntityModule, GuardModule],
  controllers: [OrderController],
  providers: [OrderService,GuardService, UserOnBoardingService,TransactionService,HttpResponse, FirebaseService, KafkaService],
})
export class OrderModule {}
