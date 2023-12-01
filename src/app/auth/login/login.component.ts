import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { User } from 'src/app/core/models/user';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  user: User = new User()
  authSub = new Subscription;
  invalidLogin: boolean = false;

  constructor(private authService: AuthService, private router: Router, private toast: MatSnackBar) { }

  ngOnInit(): void {

  }

  onSubmit(form: NgForm) {
    this.authService.login(form.value.username, form.value.password).subscribe({
      next: response  =>  {
          this.router.navigate(['/'])
      },
      error: (error) => {
        if (error.status === 401) {
          this.invalidLogin = true;
        }
        else {
          this.toast.open(error.message);
        } 
      }
    });
  }

}
