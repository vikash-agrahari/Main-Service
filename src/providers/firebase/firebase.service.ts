import { Injectable } from '@nestjs/common';
import * as admin from 'firebase-admin';
import { AcceptAny } from 'src/interfaces/types';
@Injectable()
export class FirebaseService {
  constructor() {}

  async verifyIdToken(idToken: string) {
    try {
      return await admin.auth().verifyIdToken(idToken);
    } catch (error) {
      console.log('Error in verifyIdToken:---------->', error);
    }
  }

  async getUser(uid: string) {
    try {
      return await admin.auth().getUser(uid);
    } catch (error) {
      console.log('Error in getUser:---------->', error);
    }
  }

  async removeUser(uid: string) {
    try {
      return  await admin.auth().deleteUser(uid);
    } catch (error) {
      console.log('Error in removeUser:---------->', error);
    }
  }
}
