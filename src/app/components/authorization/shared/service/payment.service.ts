import { Address } from './../../../cart/shared/model/address.model';
import { extractApiErrors } from 'src/app/shared/helpers/functions';
import { map, catchError } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {

  URL: string = 'https://cottonfest-api-v1.herokuapp.com/api/v1/payment';

  constructor(
    private http: HttpClient
  ) { }

  public makePayment(id): Observable<any> {

    return this.http.get(`${this.URL}/${id}`)
      .pipe(
        map(data => {
          return data;
        }), catchError((resErr) => {

          const errors = extractApiErrors(resErr);
          return throwError(errors);
        })
      );
  }

  public getAllCheckoutSession(body: Address): Observable<any> {
    return this.http.post(`${this.URL}/`, body)
      .pipe(
        map(data => {
          return data;
        }), catchError((resErr) => {

          const errors = extractApiErrors(resErr);
          return throwError(errors);
        })
      );
  }

}
