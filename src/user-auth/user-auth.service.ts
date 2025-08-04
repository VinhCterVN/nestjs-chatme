import { Injectable } from '@nestjs/common';
import { FirebaseService } from 'src/firebase/firebase.service';
import { ListUsersResult, UserRecord } from 'firebase-admin/auth';

@Injectable()
export class UserAuthService {
  constructor(private readonly firebase: FirebaseService) {}

  async findAll() {
    return await this.firebase.getAuth().listUsers(500);
  }

  async findOneById(id: string) {
    try {
      return await this.firebase.getAuth().getUser(id);
    } catch (e) {
      return {
        status: false,
        message: `${e.message}`,
      };
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
    let users: UserRecord[] = [];
    let result: ListUsersResult;
    let nextPageToken: string | undefined;

    do {
      result = await this.firebase
        .getAuth()
        .listUsers(500, nextPageToken || undefined);
      users = users.concat(
        result.users.filter((user: UserRecord) =>
          user.displayName?.toLowerCase().includes(name.toLowerCase()),
        ),
      );
      nextPageToken = result.pageToken;
    } while (nextPageToken);
    return {
      total: users?.length,
      users,
    };
  }
}
