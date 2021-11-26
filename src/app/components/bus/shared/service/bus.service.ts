import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { extractApiErrors } from 'src/app/shared/helpers/functions';
import { Bus } from '../model/bus.model';

@Injectable({
  providedIn: 'root'
})
export class BusService {

  
  URL: string = `https://icep-bus-api.herokuapp.com/api/v1/bus`;


  constructor(private http: HttpClient) { }

  public getActiveBus(): Observable<Bus[]> {

    return this.http.get<Bus[]>(`${this.URL}`)
      .pipe(
        map(data => {
          return data;
        }), catchError((resErr) => {
          const errors = extractApiErrors(resErr);
          return throwError(errors);
        })
      );
  }

  public getInactiveBusses(): Observable<Bus[]> {

    return this.http.get<Bus[]>(`${this.URL}/inactive`)
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
