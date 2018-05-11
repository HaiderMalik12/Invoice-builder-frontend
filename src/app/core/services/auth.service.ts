import { Injectable } from '@angular/core';
import { User, LoginRsp, SignupRsp } from '../models/user';
import { Observable } from 'rxjs/Observable';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class AuthService {

  constructor(private httpClient: HttpClient) { }

  login(body: User): Observable<LoginRsp> {
    return this.httpClient.post<LoginRsp>(`${environment.api_url}/users/login`, body)
  }
  signup(body: User): Observable<SignupRsp> {
    return this.httpClient.post<SignupRsp>(`${environment.api_url}/users/signup`, body)
  }
}
