import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { extractApiErrors } from 'src/app/shared/helpers/functions';
import { Booking } from '../model/booking.model';

@Injectable({
  providedIn: 'root'
})
export class BookingService {

  URL: string = `http://localhost:3000/api/v1/booking`;


  constructor(private http: HttpClient) { }

  public getMyBookings(): Observable<Booking[]> {

    return this.http.get<Booking[]>(`${this.URL}`)
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
