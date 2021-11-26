import { extractApiErrors } from 'src/app/shared/helpers/functions';
import { map, catchError } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../model/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  URL: string = 'https://icep-bus-api.herokuapp.com/api/v1/users';

  constructor(
    private http: HttpClient
  ) { }

  public getMe(): Observable<User> {
    return this.http.get<User>(`${this.URL}/me`)
      .pipe(
        map(data => {
          return data;
        }), catchError(resErr => {
          const errors = extractApiErrors(resErr);
          return throwError(errors);
        })
      );
  }

  public updatePhoto(body: File): Observable<User> {

    const formData: FormData = new FormData();
    formData.append('photo', body);
    // console.log(formData);
    return this.http.patch<User>(`${this.URL}/updateMe`, formData)
      .pipe(
        map(data => {
          return data;
        }), catchError(resErr => {
          const errors = extractApiErrors(resErr);
          return throwError(errors);
        })
      );
  }

  public updateMe(body: User): Observable<User> {

    return this.http.patch<User>(`${this.URL}/updateMe`, body)
      .pipe(
        map(data => {
          return data;
        }), catchError(resErr => {
          const errors = extractApiErrors(resErr);
          return throwError(errors);
        })
      );
  }
}
