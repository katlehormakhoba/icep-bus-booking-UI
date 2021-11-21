import { extractApiErrors } from './../../../../shared/helpers/functions';
import { map, catchError } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Cart } from '../model/cart.model';

@Injectable({
  providedIn: 'root'
})
export class WishService {

  URL: string = 'https://cottonfest-api-v1.herokuapp.com/api/v1/wishlist';

  constructor(private http: HttpClient) { }

  public createWishlist(id, body): Observable<Cart> {
    return this.http.post<Cart>(`${this.URL}/${id}`, body)
      .pipe(
        map(data => {
          return data;
        }), catchError(resErr => {
          const errors = extractApiErrors(resErr);
          return throwError(errors);
        })
      );
  }
  public getMyWishlist(): Observable<Cart> {
    return this.http.get<Cart>(`${this.URL}/myWishlist`)
      .pipe(
        map(data => {
          return data;
        }), catchError(resErr => {
          const errors = extractApiErrors(resErr);
          return throwError(errors);
        })
      );
  }

  public moveToCart(id, body): Observable<Cart> {
    return this.http.post<Cart>(`${this.URL}/addOrder/${id}`, body)
      .pipe(
        map(data => {
          return data;
        }), catchError(resErr => {
          const errors = extractApiErrors(resErr);
          return throwError(errors);
        })
      );
  }

  public deleteWishlist(id): Observable<null> {
    return this.http.delete<null>(`${this.URL}/${id}`)
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
