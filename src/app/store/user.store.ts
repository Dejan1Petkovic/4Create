import { Injectable } from '@angular/core';
import { EntityState, EntityStore, StoreConfig } from '@datorama/akita';
import { User } from '../models/user.model';

export interface UserState extends EntityState<User, number> {}

@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'user' })
export class UserStore extends EntityStore<UserState> {
  constructor() {
    super();
    this.setInitialUsers();
  }

  private setInitialUsers() {
    const initialUsers: User[] = [
      { id: 1, name: 'Deki', active: true },
      { id: 2, name: 'Marko', active: true },
      { id: 3, name: 'Stiv', active: false }
    ];
    this.set(initialUsers);
  }
}