import { catchError, map } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { extractApiErrors } from 'src/app/shared/helpers/functions';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  URL: string = `https://cottonfest-api-v1.herokuapp.com/api/v1/history`;

  constructor(
    private http: HttpClient
  ) { }

  public getOrderDetails(id: string): Observable<any> {
    return this.http.get(`${this.URL}/${id}`)
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
