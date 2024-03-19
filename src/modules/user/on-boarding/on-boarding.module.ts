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
import { kafkaModule } from 'src/providers/kafka/kafka.module';
import { KafkaService } from 'src/providers/kafka/kafka.service';
import { TwilioCommModule } from 'src/providers/twilio/twilio.module';
import { TwilioCommService } from 'src/providers/twilio/twilio.service';

@Module({
  imports: [ConfigModule.forRoot(),EntityModule, GuardModule, FirebaseModule, kafkaModule, TwilioCommModule],
  controllers: [UserOnBoardingController],
  providers: [UserOnBoardingService, GuardService, HttpResponse,FirebaseService, KafkaService],
})
export class UserOnBoardingModule {}
