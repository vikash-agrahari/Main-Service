import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import {UserOnBoardingService } from './on-boarding.service';
import { EntityModule } from 'src/entity/entity.module';
import { GuardModule } from 'src/guards/guards.module';
import { GuardService } from 'src/guards/guards.service';
import { HttpResponse } from 'src/common/httpResponse';
import { UserOnBoardingController } from './on-boarding.controller';

@Module({
  imports: [ConfigModule.forRoot(),EntityModule, GuardModule],
  controllers: [UserOnBoardingController],
  providers: [UserOnBoardingService, GuardService, HttpResponse],
})
export class UserOnBoardingModule {}
