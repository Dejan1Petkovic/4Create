import {  Component } from '@angular/core';
import {  UserTableComponent } from './components/user-table/user-table.component';
import {  MatDialogModule } from '@angular/material/dialog';
import {  MatToolbarModule } from '@angular/material/toolbar';

@Component({
  selector: 'app-root',
  imports: [MatDialogModule, UserTableComponent, MatToolbarModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = '4create';
}
