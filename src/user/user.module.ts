import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { FirebaseModule } from 'src/firebase/firebase.module';
import { UserController } from './user.controller';

@Module({
  imports: [FirebaseModule],
  providers: [UserService],
  controllers: [UserController],
})
export class UserModule {}
