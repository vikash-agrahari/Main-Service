import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import {UserOnBoardingService } from './on-boarding.service';
import { EntityModule } from 'src/entity/entity.module';
import { GuardModule } from 'src/guards/guards.module';
import { GuardService } from 'src/guards/guards.service';
import { HttpResponse } from 'src/common/httpResponse';
import { UserOnBoardingController } from './on-boarding.controller';
import { FirebaseService } from 'src/providers/firebase/firebase.service';
import { FirebaseModule } from 'src/providers/firebase/firebase.module';

@Module({
  imports: [ConfigModule.forRoot(),EntityModule, GuardModule, FirebaseModule],
  controllers: [UserOnBoardingController],
  providers: [UserOnBoardingService, GuardService, HttpResponse,FirebaseService],
})
export class UserOnBoardingModule {}
