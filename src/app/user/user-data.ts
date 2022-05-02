import { InMemoryDbService } from 'angular-in-memory-web-api';
import { IUser } from './user';

export class UserData implements InMemoryDbService {
  createDb(): { users: IUser[] } {
    const users: IUser[] = [
      {
        id: 1,
        username: 'Anlanther',
        password: '111',
      },
      {
        id: 2,
        username: 'Avatar',
        password: '222',
      },
    ];
    return { users };
  }
}
