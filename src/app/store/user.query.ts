import { Injectable } from '@angular/core';
import { QueryEntity } from '@datorama/akita';
import { UserStore, UserState } from './user.store';
import { User } from '../models/user.model';
import { map } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class UserQuery extends QueryEntity<UserState> {
  constructor(protected override store: UserStore) {
    super(store);
  }

  selectCanAddUser() {
    return this.selectAll().pipe(
      map((users: User[]) => users.every(user => user.active) && users.length < 5)
    );
  }
}