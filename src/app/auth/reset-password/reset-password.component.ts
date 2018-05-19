import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../../core';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit {

  form: FormGroup;
  constructor(private fb: FormBuilder,
             private authService: AuthService,
             private snackBar: MatSnackBar) { }

  ngOnInit() {
    this.initForm();
  }
  onSubmit(){
    let {password, confirmPassword} = this.form.value;
    if(password !== confirmPassword){
      this.snackBar.open('Both password should match', 'warning',{
        duration: 3000
      });
      return;
    }
  }
  private initForm(){
    this.form = this.fb.group({
      password: ['', Validators.required],
      confirmPassword : ['', Validators.required]
    })
  }


}
