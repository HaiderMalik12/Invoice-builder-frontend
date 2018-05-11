import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../core/services/auth.service';
import { JwtService } from '../core/services/jwt.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {

  authForm: FormGroup;
  title = '';
  constructor(private fb: FormBuilder,
    private authService: AuthService,
    private jwtService: JwtService,
    private router: Router) { }

  ngOnInit() {
    this.initForm();
    debugger;
    this.title = this.router.url === '/login' ? 'Login' : 'Signup';
  }

  onSubmit() {
    this.authService.login(this.authForm.value)
      .subscribe(data => {
        console.log(data);
        this.jwtService.seToken(data.token)
        this.router.navigate(['/dashboard', 'invoices']);
      }, err => console.error(err));
  }
  private initForm() {
    this.authForm = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    })
  }

}
