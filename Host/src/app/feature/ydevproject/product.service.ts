import { HttpClient } from '@angular/common/http';
import { Injectable, Pipe } from '@angular/core';
import { finalize, map, Observable } from 'rxjs';
import { ProductModel } from './productmodel';
import { createHttpObservable } from './y-utils';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  constructor(private http: HttpClient) {}

  getAllFromJSONFile(): any {


   // const prods$;

    try {

      const http$ = createHttpObservable('https://localhost:44371/api/app/product');
      const prods$ = http$.pipe(
        map( res => Object.values(res["items"]))
      );

      return prods$;
    } catch (error) {
      if (error instanceof Error) {
        console.log(error.message);
      }
    }
  }
}
