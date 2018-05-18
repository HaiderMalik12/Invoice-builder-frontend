import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpEventType,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { JwtService } from './jwt.service';
import { Router } from '@angular/router';
import 'rxjs/add/operator/do';

@Injectable()
export class TokenInterceptorService implements HttpInterceptor {
  constructor(private jwtService: JwtService, private router: Router) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const headersConfig = {
      'Content-Type': 'application/json',
      Accept: 'application/json'
    };
    const token = this.jwtService.getToken();
    if (token) {
      headersConfig['Authorization'] = `bearer ${token}`;
    }
    const _req = req.clone({ setHeaders: headersConfig });
    return next.handle(_req).do(
      (event: HttpEvent<any>) => {},
      err => {
        if (err instanceof HttpErrorResponse) {
          if (err.status === 401) {
            this.jwtService.destroyToken();
            this.router.navigate(['/login']);
          }
        }
      }
    );
  }
}
