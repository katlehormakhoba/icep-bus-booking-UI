import { catchError, map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { Injectable } from '@angular/core';
import { Cart } from '../model/cart.model';
import { extractApiErrors } from 'src/app/shared/helpers/functions';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  URL: string = 'https://cottonfest-api-v1.herokuapp.com/api/v1/carts';

  constructor(private http: HttpClient) { }

  public getAllOrders(): Observable<Cart[]> {
    return this.http.get<Cart[]>(`${this.URL}/`)
      .pipe(
        map(data => {
          return data;
        }), catchError(resErr => {
          const errors = extractApiErrors(resErr);
          return throwError(errors);
        }));
  }

  public getMyOrders(): Observable<Cart[]> {
    return this.http.get<Cart[]>(`${this.URL}/myOrders`)
      .pipe(
        map(data => {
          return data;
        }), catchError(resErr => {
          const errors = extractApiErrors(resErr);
          return throwError(errors);
        }));
  }

  public createOrder(id, formBody): Observable<Cart> {
    return this.http.post<Cart>(`${this.URL}/${id}`, formBody)
      .pipe(
        map(data => {
          return data;
        }),
        catchError((resErr) => {
          const errors = extractApiErrors(resErr);
          return throwError(errors);
        }));
  }

  public getOrder(id): Observable<Cart> { // cart ID is being sent
    return;
  }

  public updateOrder(id): Observable<Cart> { // cart ID is being sent
    return;
  }

  public deleteOrder(id): Observable<Cart> { // cart ID is being sent
    return this.http.delete<Cart>(`${this.URL}/${id}`)
      .pipe(
        map(data => {
          return data;
        }), catchError((resErr) => {
          const errors = extractApiErrors(resErr);
          return throwError(errors);
        }));
  }

  public moveToWishlist(id, body): Observable<Cart> {
    return this.http.post<Cart>(`${this.URL}/addWishlist/${id}`, body)
      .pipe(
        map(data => {
          return data;
        }), catchError(resErr => {
          const errors = extractApiErrors(resErr);
          return throwError(errors);
        })
      );
  }


  public getCartStats(): Observable<any> {

    return this.http.get(`${this.URL}/cartStates`)
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
