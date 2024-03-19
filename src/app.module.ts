import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { RouterModule, Routes } from '@nestjs/core';
import { ScheduleModule } from '@nestjs/schedule';
import configuration from 'config/configuration';
import { LoggerModule } from './logger/logger.module';
import { DatabaseModule } from './providers/database/db.module';
import { schemaProviders } from './schema/schema.provider';
import { APP_FILTER } from '@nestjs/core';
import { AllExceptionsFilter } from 'src/filters/exceptionFilter';
import { UserOnBoardingModule } from './modules/user/on-boarding/on-boarding.module';
import { OnboardingModule } from './modules/admin/onboarding/onboarding.module';
import { UserManagementModule } from './modules/admin/user-management/user-management.module';
import { FirebaseModule } from './providers/firebase/firebase.module';
import { kafkaModule } from './providers/kafka/kafka.module';
import { TwilioCommModule } from './providers/twilio/twilio.module';


//for routing admin and app path separately
const routes: Routes = [
  {
    path: '/user',
    children: [
      {
        path: '/onboarding',
        module: UserOnBoardingModule,
      },
    ],
  },
  {
    path: '/admin',
    children: [
      {
        path: '/onboarding',
        module: OnboardingModule,
      },
      {
        path: '/client',
        module: UserManagementModule,
      },
    ],
  },
  
];
@Module({
  imports: [
    ConfigModule.forRoot({ load: [configuration], isGlobal: true }),
    ScheduleModule.forRoot(),
    DatabaseModule,
    LoggerModule,
    RouterModule.register(routes),
    UserOnBoardingModule,
    OnboardingModule,
    UserManagementModule,
    FirebaseModule,
    kafkaModule,
    TwilioCommModule
    // kafkaModule,
  ],
  providers: [
    ...schemaProviders,
    {
      provide: APP_FILTER,
      useClass: AllExceptionsFilter,
    },
  ],
})
export class AppModule {}
