import { extractApiErrors } from 'src/app/shared/helpers/functions';
import { map, catchError } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Address } from 'src/app/components/cart/shared/model/address.model';

@Injectable({
  providedIn: 'root'
})
export class AddressService {
  URL: string = `https://cottonfest-api-v1.herokuapp.com/api/v1/address`;

  constructor(
    private http: HttpClient
  ) { }

  public getMyAddress(): Observable<Address> {
    return this.http.get<Address>(`${this.URL}/myAddress`)
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
