import { AuthService } from './../shared/service/auth.service';
import { LoginForm } from './../shared/model/login.model';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginFormData: LoginForm;
  message: string;
  errors = [];

  constructor(
    private auth: AuthService,
    private router: Router,
    private route: ActivatedRoute) { }

  ngOnInit(): void {

    this.loginFormData = new LoginForm();
    this.checkMessage();
  }


  login() {

    this.errors = [];

    this.auth.login(this.loginFormData).subscribe(data => {
      // do something if successfull

      // console.log(data.token);
      this.router.navigate(['/'], {
        queryParams: { message: 'You logged in successfully ' }
      });
    }, errors => {

      this.errors[0] = errors;
    });

  }


  checkMessage() {
    this.route.queryParams.subscribe(params => {
      params['message'] ? this.message = params['message'] : null;

      setTimeout(() => {
        this.router.navigate([], {
          replaceUrl: true,
          queryParams: { message: null },
          queryParamsHandling: 'merge'
        });

      }, 2000);
    });
  }

}
