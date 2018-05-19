import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../../core';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit {

  form : FormGroup;
  constructor(
    private fb: FormBuilder,
     private authService: AuthService) { }

  ngOnInit() {
    this.initForm();
  }
  private initForm(){
    this.form = this.fb.group({
      email : ['', Validators.required]
    })
  }
  onSubmit(){
   this.authService.forgotPassword(this.form.value)
   .subscribe(data => {
     console.log(data);
   },err => {
     console.error(err);
   })
  }

}
