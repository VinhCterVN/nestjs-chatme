import { Injectable } from '@nestjs/common';
import * as admin from 'firebase-admin';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class FirebaseService {
  private readonly firestore: admin.firestore.Firestore;
  private readonly auth: admin.auth.Auth;

  constructor(private readonly config: ConfigService) {
    admin.initializeApp({
      credential: admin.credential.cert({
        projectId: this.config.get<string>("FIREBASE_PROJECT_ID"),
        privateKey: this.config.get<string>("FIREBASE_PRIVATE_KEY")?.replace(/\\n/g, '\n'),
        clientEmail: this.config.get<string>("FIREBASE_CLIENT_EMAIL"),
      }),
    });
    
    
    this.firestore = admin.firestore();
    this.auth = admin.auth();
    this.firestore.settings({
      ignoreUndefinedProperties: true
    })
  }

  getFirestore() {
    return this.firestore;
  }
  
  getAuth() {
    return this.auth;
  }
}
