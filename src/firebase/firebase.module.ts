import { FirebaseService } from 'src/firebase/firebase.service';
import { Module } from '@nestjs/common';

@Module({
  providers: [FirebaseService],
  exports: [FirebaseService],
})
export class FirebaseModule {}