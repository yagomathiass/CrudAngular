import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { tap, delay } from 'rxjs/operators';
import { Products } from './products';


@Injectable({
  providedIn: 'root'
})
export class ProductService {

  readonly url = 'http://localhost:3000/products'

  private productsSubject$: BehaviorSubject<Products[]> = new BehaviorSubject<Products[]>(null);
  private loaded: boolean = false;

  constructor(private http: HttpClient) { }

  get(): Observable<Products[]> {
    if (!this.loaded) {
      this.http.get<Products[]>(this.url)
        .pipe(
          tap((deps) => console.log(deps)),
          delay(1000)
        )
        .subscribe(this.productsSubject$);
      this.loaded = true;
    };
    return this.productsSubject$.asObservable()
  };

  add(d: Products): Observable<Products> {
    return this.http.post<Products>(this.url, d)
      .pipe(
        tap((dep: Products) =>
          this.productsSubject$.getValue().push(dep)
        )
      )
  }


  del(dep: Products): Observable<any> {
    return this.http.delete(`${this.url}/${dep._id}`)
      .pipe(
        tap(() => {
          let products = this.productsSubject$.getValue();
          let i = products.findIndex(d => d._id === dep._id);
          if (i >= 0)
            products.splice(i, 1);
        })
      )
  }


  update(dep: Products): Observable<Products> {
    return this.http.patch<Products>(`${this.url}/${dep._id}`, dep)
      .pipe(
        tap((d) => {
          let products = this.productsSubject$.getValue();
          let i = products.findIndex(d => d._id === dep._id);
          if (i >= 0)
            products[i].prodName = d.prodName;
        })
      )
  }
};
