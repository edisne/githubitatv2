import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/core/models/user';

@Component({
  selector: 'app-user-card',
  templateUrl: './user-card.component.html',
  styleUrls: ['./user-card.component.scss']
})
export class UserCardComponent {

  @Input() user: User | undefined;

  constructor(private router: Router) { }

  showUserDetails() {
    this.router.navigate(['user/', this.user?.login]);
  }
}
