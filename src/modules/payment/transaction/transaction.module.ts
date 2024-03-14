import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import {TransactionService } from './transaction.service';
import { EntityModule } from 'src/entity/entity.module';
import { GuardModule } from 'src/guards/guards.module';
import { GuardService } from 'src/guards/guards.service';
import { HttpResponse } from 'src/common/httpResponse';
import { TransactionController } from './transaction.controller';

@Module({
  imports: [ConfigModule.forRoot(),EntityModule, GuardModule],
  controllers: [TransactionController],
  providers: [TransactionService,GuardService, HttpResponse],
})
export class TransactionModule {}
