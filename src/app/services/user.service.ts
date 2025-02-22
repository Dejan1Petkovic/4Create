import { Injectable } from '@angular/core';
import { UserStore } from '../store/user.store';
import { UserQuery } from '../store/user.query';
import { User } from '../models/user.model';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(private userStore: UserStore, private userQuery: UserQuery) {}

  get users$(): Observable<User[]> {
    return this.userQuery.selectAll();
  }

  get canAddUser$(): Observable<boolean> {
    return this.userQuery.selectCanAddUser();
  }

  toggleActive(user: User) {
    this.userStore.update(user.id, { active: !user.active });
  }

  addUser(user: User) {
    const id = this.userQuery.getCount() + 1;
    this.userStore.add({ ...user, id, active: false });
  }

  isNameUnique(name: string): Observable<boolean> {
    return this.userQuery.selectAll().pipe(
      map(users => !users.some(user => user.name === name))
    );
  }
}