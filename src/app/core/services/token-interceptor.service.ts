import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { JwtService } from './jwt.service';

@Injectable()
export class TokenInterceptorService implements HttpInterceptor {

  constructor(private jwtService: JwtService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const headersConfig = {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    }
    debugger;
    const token = this.jwtService.getToken()
    if (token) {
      headersConfig['Authorization'] = `bearer ${token}`
    }
    const _req = req.clone({ setHeaders: headersConfig });
    return next.handle(_req);
  }
}
