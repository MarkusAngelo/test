import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TestServiceService } from '../test-service.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
})
export class UsersComponent implements OnInit {
  userForm: FormGroup;
  userList: any[] = [];

  constructor(private fb: FormBuilder, private service: TestServiceService) {
    this.userForm = this.fb.group({
      userId: [0],
      emailId: ['', [Validators.required, Validators.email]],
      fullName: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(8)]],
    });
  }
  ngOnInit(): void {
    this.getUsers();
  }
  getUsers() {
    this.service.getUsers().subscribe((res: any) => {
      this.userList = res.data;
    });
  }

  removeUser(id: any) {
    if (confirm('Sure ka beh?')) {
      this.service.deleteUser(id).subscribe((res: any) => this.getUsers());
    }
  }

  onSubmit() {
    let dat = this.userForm.value;
    this.service.addUser(dat).subscribe((res: any) => {
      if (res.result) {
        alert(res.message);
      } else {
        alert(res.message);
      }
      this.getUsers();
    });
  }
}
