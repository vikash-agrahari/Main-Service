import { Module } from '@nestjs/common';
import { EntityModule } from 'src/entity/entity.module';
import { HttpResponse } from 'src/common/httpResponse';
import { ConfigModule } from '@nestjs/config';
import { GuardModule } from 'src/guards/guards.module';
import { GuardService } from 'src/guards/guards.service';
import { UserManagementService } from './user-management.service';
import { UserManagementController } from './user-management.controller';

@Module({
  imports: [ConfigModule.forRoot(), EntityModule, GuardModule],
  controllers: [UserManagementController],
  providers: [UserManagementService, HttpResponse, GuardService],
})
export class UserManagementModule {}
