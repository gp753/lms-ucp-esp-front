import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor() {}
 /**
   * Intercept
   *
   * @param req
   * @param next
   */
  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    let newReq = request.clone();
    const token = localStorage.getItem('token');
    console.log('funciona', token)
    if (token != null) {
      newReq = request.clone({
        headers: request.headers
          .set('Authorization', 'Bearer '+token)
      });
    }

    return next.handle(newReq);
  }
}
