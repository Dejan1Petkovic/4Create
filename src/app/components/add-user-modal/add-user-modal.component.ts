import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { UserService } from '../../services/user.service';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { uniqueNameValidator } from '../../validators/unique-name.validator';

@Component({
  selector: 'app-add-user-modal',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatCheckboxModule
    ],
  templateUrl: './add-user-modal.component.html',
  styleUrls: ['./add-user-modal.component.scss']
})
export class AddUserModalComponent implements OnInit {
  addUserForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private dialogRef: MatDialogRef<AddUserModalComponent>
  ) {}
  
  ngOnInit() {
    this._createForm();
  }

  private _createForm() {
    this.addUserForm = this.fb.group({
      name: ['', 
        {
          validators: [Validators.required], 
          asyncValidators: [uniqueNameValidator(this.userService)], 
          updateOn: 'blur'
        }
      ],
      active: [false]
    });
  }

  onSubmit() {
    if (!this.addUserForm.invalid) {
      this.userService.addUser(this.addUserForm.value);
      this.dialogRef.close();
    }
  }

  onCancel() {
    this.dialogRef.close();
  }
}