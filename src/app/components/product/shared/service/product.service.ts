import { map, catchError } from 'rxjs/operators';
import { Product } from '../model/product.model';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { extractApiErrors } from 'src/app/shared/helpers/functions';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  URL: string = `http://localhost:3000/api/v1/bus`;

  constructor(private http: HttpClient) { }

  public getAllProducts(): Observable<Product[]> {

    return this.http.get<Product[]>(`${this.URL}`)
      .pipe(
        map(data => {
          return data;
        }), catchError((resErr) => {
          const errors = extractApiErrors(resErr);
          return throwError(errors);
        })
      );
  }


public getActiveBus(): Observable<any[]> {

    return this.http.get<any[]>(`${this.URL}`)
      .pipe(
        map(data => {
          return data;
        }), catchError((resErr) => {
          const errors = extractApiErrors(resErr);
          return throwError(errors);
        })
      );
  }
  public getProduct(id): Observable<Product> {
    return this.http.get<Product>(`${this.URL}/${id}`)
      .pipe(
        map(data => {
          return data;
        }), catchError(resErr => {
          const errors = extractApiErrors(resErr);
          return throwError(errors);
        }));
  }

  public updateProduct(id): Observable<Product> {
    return;
  }

  public deleteProduct(id): Observable<Product> {
    return;
  }

  public createProduct(): Observable<Product> {
    return;
  }
}
