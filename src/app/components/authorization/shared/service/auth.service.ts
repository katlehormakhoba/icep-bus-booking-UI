import { LoginForm } from './../model/login.model';
import { extractApiErrors } from './../../../../shared/helpers/functions';
import { RegisterForm } from './../model/register.model';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { Injectable } from '@angular/core';
import { catchError, map } from 'rxjs/operators';
import { JwtHelperService } from '@auth0/angular-jwt';
import * as moment from 'moment';


const jwt = new JwtHelperService();

class DecodedToken {
  exp: number = 0;
  iat: number = 0;
  name: string = '';
  id: string = '';
  photo: string = '';
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  URL: string = 'https://cottonfest-api-v1.herokuapp.com/api/v1/users';
  private decodedToken: DecodedToken;

  constructor(private http: HttpClient) {
    this.decodedToken = new DecodedToken();
  }


  public signup(data: RegisterForm): Observable<any> {
    // alert(JSON.stringify(data));
    return this.http
      .post(`${this.URL}/signup`, data)
      .pipe(
        map(data => {

          const token = data['token'];
          this.saveToken(token);
          return data;
        }),
        catchError((resErr) => {
          const errors = extractApiErrors(resErr);
          return throwError(errors);
        }));
  }

  public login(data: LoginForm): Observable<any> {
    return this.http.post(`${this.URL}/login`, data)
      .pipe(
        map(data => {
          const token = data['token'];
          this.saveToken(token);
          // console.log('my token is ', token);
          return data;
        }),
        catchError(resErr => {
          const errors = extractApiErrors(resErr);
          return throwError(errors);
        }));
  }

  public logout() {
    localStorage.removeItem('Bearer token');
    this.decodedToken = new DecodedToken();
  }


  private saveToken(token: string): string | null {
    // token = JSON.stringify(token);
    // alert(token);
    const decodedToken = jwt.decodeToken(token);
    // console.log(decodedToken);

    if (!decodedToken) {
      return null;
    }

    this.decodedToken = decodedToken;
    localStorage.setItem('Bearer token', token);

    return token;

  }

  get getAuthToken() {
    return localStorage.getItem('Bearer token');
  }

  checkAuthentication(): boolean {

    const authToken = localStorage.getItem('Bearer token');


    if (!authToken) {
      return false;
    }

    const decodedToken = jwt.decodeToken(authToken);

    if (!decodedToken) {
      return false;
    }

    this.decodedToken = decodedToken;


    return true;
  }

  get username(): string {
    return this.decodedToken.name;
  }

  get userPhoto(): string {
    return this.decodedToken.photo;
  }

  get isAuthenticated(): boolean {

    // console.log('token ', this.decodedToken)
    const expiration = moment.unix(this.decodedToken.exp);
    const isAuth = moment().isBefore(expiration);
    // console.log('My Auth ', isAuth)


    return isAuth;
  }

  public forgotPassword(): Observable<any> {
    return;
  }

  public resetPassword(): Observable<any> {
    return;
  }

  public updatePassword(): Observable<any> {
    return;
  }

}
