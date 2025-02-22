import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { UserService } from '../../services/user.service';
import { Observable } from 'rxjs';
import { User } from '../../models/user.model';
import { AddUserModalComponent } from '../add-user-modal/add-user-modal.component';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-user-table',
  imports: [CommonModule, MatDialogModule, MatTableModule, MatButtonModule],
  templateUrl: './user-table.component.html',
  styleUrls: ['./user-table.component.scss']
})
export class UserTableComponent {
  users$: Observable<User[]>;
  dataSource = new MatTableDataSource<User>([]);
  canAddUser$: Observable<boolean>;
  displayedColumns: string[] = ['id', 'name', 'active'];

  constructor(private userService: UserService, private dialog: MatDialog) {
    this.users$ = this.userService.users$;
    this.canAddUser$ = this.userService.canAddUser$;
  }

  toggleActive(user: User) {
    this.userService.toggleActive(user);
  }

  openAddUserModal() {
    this.dialog.open(AddUserModalComponent, {
      width: '400px'
    });
  }
}