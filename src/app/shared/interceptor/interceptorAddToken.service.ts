import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class InterceptorAddTokenService implements HttpInterceptor {

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if(localStorage.getItem('token')){
      const authorization = `Bearer ${localStorage.getItem('token') || ''}`
      req = req.clone({setHeaders: {authorization} })
    }
    return next.handle(req)
  }
}
