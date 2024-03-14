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
import { ClientOnBoardingModule } from './modules/client/on-boarding/on-boarding.module';
import { TransactionModule } from './modules/payment/transaction/transaction.module';
import { WebhookModule } from './modules/payment/webhook/webhook.module';
import { OnboardingModule } from './modules/admin/onboarding/onboarding.module';
import { ClientManagementModule } from './modules/admin/client-management/client-management.module';
import { OrderModule } from './modules/payment/order/order.module';
import { OrderManagementModule } from './modules/admin/order-management/order-management.module';


//for routing admin and app path separately
const routes: Routes = [
  {
    path: '/client',
    children: [
      {
        path: '/onboarding',
        module: ClientOnBoardingModule,
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
        module: ClientManagementModule,
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
    ClientOnBoardingModule,
    OrderModule,
    TransactionModule,
    WebhookModule,
    OnboardingModule,
    ClientManagementModule,
    OrderManagementModule
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
