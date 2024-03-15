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
  constructor(private readonly config : ConfigService) {
    const firebaseKey:string = this.config.get('FIREBASE_CONFIG') as string;
    admin.initializeApp({
      credential: admin.credential.cert(JSON.parse(firebaseKey)),
    });
  }
}
