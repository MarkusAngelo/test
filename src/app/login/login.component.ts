import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { TestServiceService } from '../test-service.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  loginForm: FormGroup;

  constructor(
    private serve: TestServiceService,
    private fb: FormBuilder,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      emailId: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }
  onSubmit() {
    const { emailId, password } = this.loginForm.value;
    this.serve.log_in(emailId, password).subscribe((res: any) => {
      console.log(res);
      if (res.data) {
        // localStorage.setItem('jiraLoginDetails', JSON.stringify(res.data));
        this.router.navigateByUrl('board');
      } else {
        alert(res.data + res.message);
      }
    });
  }
}
