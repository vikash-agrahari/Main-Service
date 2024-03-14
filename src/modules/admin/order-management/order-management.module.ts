import { Module } from '@nestjs/common';
import { EntityModule } from 'src/entity/entity.module';
import { HttpResponse } from 'src/common/httpResponse';
import { ConfigModule } from '@nestjs/config';
import { GuardModule } from 'src/guards/guards.module';
import { GuardService } from 'src/guards/guards.service';
import { OrderManagementService } from './order-management.service';
import { OrderManagementController } from './order-management.controller';

@Module({
  imports: [ConfigModule.forRoot(), EntityModule, GuardModule],
  controllers: [OrderManagementController],
  providers: [OrderManagementService, HttpResponse, GuardService],
})
export class OrderManagementModule {}
