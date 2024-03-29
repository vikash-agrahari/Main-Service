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

@Module({
  imports: [ConfigModule.forRoot(),EntityModule, GuardModule],
  controllers: [OrderController],
  providers: [OrderService,GuardService, UserOnBoardingService,TransactionService,HttpResponse],
})
export class OrderModule {}
