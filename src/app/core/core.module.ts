import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { AuthService } from './services/auth.service';
import { JwtService } from './services/jwt.service';
import { HttpInterceptorService } from './services/http-interceptor.service';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule
  ],
  declarations: [],
  providers: [AuthService, JwtService, HttpInterceptorService]
})
export class CoreModule { }
