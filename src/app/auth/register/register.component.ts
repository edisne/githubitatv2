import { Component, OnInit } from '@angular/core';
import { AbstractControl, NgForm, NgModel, ValidationErrors } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { User } from 'src/app/core/models/user';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  user:User = new User();
  repeatPassword: string = ''
  passwordValid = true;
  passwordsNotMatching = true;
  regex = new RegExp('^(?=.*[0-9])(?=.*[A-Z]).{6,}$');


  constructor(private authService:AuthService, 
              private router:Router, 
              private toast: MatSnackBar) { }

  ngOnInit(): void {
  }
  onSubmit(form:NgForm){
    let user:User = form.value;
    this.authService.register(user).subscribe({
      next: response => {
        this.router.navigate(['/']);
      },
      error: response => {
        this.toast.open(response.error.message, "Close");
      }
    });

  }

  passwordMatchValidator(repeat: NgModel) { 
    this.passwordsNotMatching = this.user.password !== this.repeatPassword;
    this.passwordsNotMatching ? repeat.control.setErrors({'incorrect':true}) : repeat.control.setErrors(null);
  }

  passwordStrengthValidator(password:NgModel){
    this.passwordValid = this.regex.test(password.model);
    this.passwordValid ? password.control.setErrors(null) : password.control.setErrors({'incorrect':true})
  }
} 
