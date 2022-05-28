import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable()
export class JwtInterceptorInterceptor implements HttpInterceptor {

  constructor() {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    console.log("Code between interceptor is executed.");
    console.log(request);
    let access = localStorage.getItem("access");

    if(access != null){


      request = request.clone({
        setHeaders: {'Authorization':`Bearer ${access}`}
      });

      return next.handle(request);
    }else{
      return next.handle(request);
    }
  }
}
