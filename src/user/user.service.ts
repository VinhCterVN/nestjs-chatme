import { Injectable } from '@nestjs/common';
import { UserRecord } from 'firebase-admin/auth';
import { FirebaseService } from 'src/firebase/firebase.service';
import { CreateUserInput } from 'src/user/dto';

@Injectable()
export class UserService {
  constructor(private readonly firebase: FirebaseService) {}

  async findAll() {
    return await this.firebase
      .getFirestore()
      .collection('users')
      .get()
      .then((snapshot) => {
        return snapshot.docs.map((doc) => ({...doc.data() as UserRecord}));
      });
  }

  async findOneById(id: string) {
    try {
      return this.firebase.getFirestore().collection('users').doc(id);
    } catch (error) {
      console.log(error);
    }
  }

  async deleteUser(id: string) {
    try {
      await this.firebase.getAuth().deleteUser(id);
      return {
        status: 'deleted',
        message: `User with id ${id} has been deleted successfully.`,
      };
    } catch (e) {
      return {
        status: 'error',
        message: `Error: ${e.message}`,
      };
    }
  }

  async findByName(name: string) {
    const users = await this.firebase
      .getFirestore()
      .collection('users')
      .get()
      .then((snapshot) => {
        return snapshot.docs
          .filter((doc) =>
            doc.data().displayName.toLowerCase().includes(name.toLowerCase()),
          )
          .map((doc) => ({
            id: doc.id,
            ...(doc.data() as UserRecord),
          }));
      });

    return {
      total: users?.length,
      users,
    };
  }

  async createUser(user: CreateUserInput) {
    try {
      return await this.firebase.getFirestore().collection('users').add({
        uid: user.uid,
        displayName: user.displayName,
        email: user.email,
        phoneNumber: user.phoneNumber,
        photoURL: user.photoURL,
        disabled: user.disabled,
        lastActive: new Date(),
        createdAt: new Date(),
        updatedAt: new Date(),
      });
    } catch (error) {
      console.log(error);
    }
  }
}
