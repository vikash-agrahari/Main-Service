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
import { TransactionModule } from './modules/payment/transaction/transaction.module';
import { WebhookModule } from './modules/payment/webhook/webhook.module';
import { OnboardingModule } from './modules/admin/onboarding/onboarding.module';
import { UserManagementModule } from './modules/admin/user-management/user-management.module';
import { OrderModule } from './modules/payment/order/order.module';
import { OrderManagementModule } from './modules/admin/order-management/order-management.module';
import { FirebaseModule } from './providers/firebase/firebase.module';
import { kafkaModule } from './providers/kafka/kafka.module';


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
    path: '/order',
    children: [
      {
        path: '/',
        module: OrderModule
      },
    ],
  },
  {
    path: '/transaction',
    children: [
      {
        path: '/',
        module: TransactionModule,
      },
    ],
  },

  {
    path: '/webhook',
    children: [
      {
        path: '/',
        module: WebhookModule,
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
      {
        path: '/order',
        module: OrderManagementModule,
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
    OrderModule,
    TransactionModule,
    WebhookModule,
    OnboardingModule,
    UserManagementModule,
    OrderManagementModule,
    FirebaseModule,
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
