import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import * as admin from 'firebase-admin';
import { resolve } from 'path';
import { EntityModule } from 'src/entity/entity.module';
import { KafkaService } from './kafka.service';

@Module({
  imports: [ConfigModule.forRoot(), EntityModule],
  providers: [KafkaService],
  exports: [KafkaService],
})
export class kafkaModule {}

