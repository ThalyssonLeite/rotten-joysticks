import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Store } from "@ngrx/store";
import { catchError, Observable, ObservableInput, throwError } from "rxjs";
import { setHeaderMenuLabel } from "../data/app.actions";

@Injectable({
  providedIn: 'root'
})

export class Interceptor implements HttpInterceptor {
  constructor (private store: Store<{ header }>, private router: Router) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = localStorage.getItem('token');
    if (token === null) return next.handle(req);

    const modifiedRequest = req.clone({
      setHeaders: {
        'x-api-key': token
      }
    })

    return next.handle(modifiedRequest).pipe(
      catchError((res: any): ObservableInput<any> => {
        if (res.error.statusCode === 401) {
          this.store.dispatch(setHeaderMenuLabel({ label: 'Home' }));
          localStorage.removeItem('token');
          this.router.navigate(['']);
        }

        return throwError(res);
      }))
  }
}
