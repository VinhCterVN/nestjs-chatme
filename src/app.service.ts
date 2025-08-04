import { Get, Injectable, Param } from '@nestjs/common';
import { FirebaseService } from 'src/firebase/firebase.service';

@Injectable()
export class AppService {
  
  constructor(private readonly firebaseService: FirebaseService) {}
  getHello() {
    return this.firebaseService.getAuth().listUsers();
  }
  
  async getUser(@Param('id') id: string) {
    return this.firebaseService.getAuth().getUser(id);
  }
}
