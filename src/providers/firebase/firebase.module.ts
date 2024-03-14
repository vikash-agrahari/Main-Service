import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { FirebaseService } from './firebase.service';
import * as admin from 'firebase-admin';
import { resolve } from 'path';
import { EntityModule } from 'src/entity/entity.module';


@Module({
  imports: [ConfigModule.forRoot(), EntityModule],
  providers: [FirebaseService],
  exports: [FirebaseService],
})
export class FirebaseModule {
  constructor() {
    const env = process.env.NODE_ENV || false;
    if (!env) process.exit(100);
    admin.initializeApp({
      credential: admin.credential.cert(resolve(process.cwd(), `firebase.${env}.json`)),
    });
  }
}
