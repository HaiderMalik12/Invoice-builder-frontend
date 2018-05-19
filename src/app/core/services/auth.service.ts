import { Injectable } from '@angular/core';
import { User, LoginRsp, SignupRsp, LogoutRsp } from '../models/user';
import { Observable } from 'rxjs/Observable';
import { environment } from '../../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable()
export class AuthService {
  constructor(private httpClient: HttpClient) {}

  login(body: User): Observable<LoginRsp> {
    return this.httpClient.post<LoginRsp>(
      `${environment.api_url}/users/login`,
      body
    );
  }
  signup(body: User): Observable<SignupRsp> {
    return this.httpClient.post<SignupRsp>(
      `${environment.api_url}/users/signup`,
      body
    );
  }
  googleAuth(): Observable<LoginRsp> {
    return this.httpClient.get<LoginRsp>(`${environment.api_url}/auth/google`);
  }
  isAuthenticated(token): Observable<boolean> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: `bearer ${token}`
      })
    };
    return this.httpClient.get<boolean>(
      `${environment.api_url}/auth/authenticate`,
      httpOptions
    );
  }
  logOut(): Observable<LogoutRsp> {
    return this.httpClient.get<LogoutRsp>(`${environment.api_url}/auth/logout`);
  }
  forgotPassword(data: {email: string}) : Observable<{message: string}> {
    return this.httpClient.post<{message: string}>(`${environment.api_url}/users/forgot-password`,data);
  }
  resetPassword(body) : Observable<{success: boolean}>{
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type' :'application/json',
        'Authorization': `bearer ${body.token}`
      })
    }
    return this.httpClient.put<{success: boolean}>(`${environment.api_url}/users/reset-password`,
    {password: body.password},
    httpOptions)
  }
}
