import { Router } from '@angular/router';
import { AuthService } from './../shared/service/auth.service';
import { RegisterForm } from '../shared/model/register.model';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  registerFormData: RegisterForm;
  errors = [];

  constructor(private auth: AuthService, private router: Router) { }

  public signup() {

    this.errors = [];
    // console.log(this.registerFormData)
    this.auth.signup(this.registerFormData).subscribe(data => {
      // do something if successfull
      // console.log('new user', data);
      this.router.navigate(['/'], {
        queryParams: { message: 'You have registered successfully' }
      });
    }, errors => {
      this.errors[0] = errors;

    });

  }

  ngOnInit(): void {
    this.registerFormData = new RegisterForm();
  }

}
