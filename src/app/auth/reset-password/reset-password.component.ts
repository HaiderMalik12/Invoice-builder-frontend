import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../../core';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit {

  form: FormGroup;
  constructor(private fb: FormBuilder,
             private authService: AuthService) { }

  ngOnInit() {
    this.initForm();
  }
  private initForm(){
    this.form = this.fb.group({
      password: ['', Validators.required],
      confirmPassword : ['', Validators.required]
    })
  }

}
