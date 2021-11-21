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

  URL: string = `https://cottonfest-api-v1.herokuapp.com/api/v1/products`;

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
