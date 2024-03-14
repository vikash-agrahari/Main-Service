import { Module } from '@nestjs/common';
import { EntityModule } from 'src/entity/entity.module';
import { HttpResponse } from 'src/common/httpResponse';
import { ConfigModule } from '@nestjs/config';
import { GuardModule } from 'src/guards/guards.module';
import { GuardService } from 'src/guards/guards.service';
import { ClientManagementService } from './client-management.service';
import { ClientManagementController } from './client-management.controller';

@Module({
  imports: [ConfigModule.forRoot(), EntityModule, GuardModule],
  controllers: [ClientManagementController],
  providers: [ClientManagementService, HttpResponse, GuardService],
})
export class ClientManagementModule {}
