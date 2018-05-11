import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { AuthService } from './services/auth.service';
import { JwtService } from './services/jwt.service';
import { TokenInterceptorService } from './services/token-interceptor.service';
import { AuthGuardService } from './services/auth-guard.service';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule
  ],
  declarations: [],
  providers: [AuthService, JwtService, TokenInterceptorService, AuthGuardService]
})
export class CoreModule { }
