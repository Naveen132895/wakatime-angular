import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { Router } from '@angular/router';

import { AuthService } from '../services/auth.service';

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {
  
  constructor(private auth : AuthService, private router : Router,private formBuilder: FormBuilder) { }
  title = 'validform';
  registerForm: FormGroup;
  submitted = false;

// FormControl: It tracks the value and validation status of the individual form control.
// FormGroup: It tracks the same values and status for the collection of form controls.

  // convenience getter for easy access to form fields
  get f() { return this.registerForm.controls; }

  onSubmit() {
    this.submitted = true;
    if (this.registerForm.invalid) {
      return;
    }
    let status = this.auth.login(this.registerForm.value.email,this.registerForm.value.password);
    if(status == true){
      window.location.reload();
    }else{
      alert("Invalid Credentials");
    }
  }
  

  ngOnInit() {
    if(sessionStorage.getItem('isLoggedIn') == 'true'){
      this.router.navigate(["home"]);
    }else{
      this.registerForm = this.formBuilder.group(
        {
          email: ['', [Validators.required, Validators.email]],
          password: ['', [Validators.required, Validators.minLength(6)]]
        });
    }
  }

}