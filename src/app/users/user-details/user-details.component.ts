import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, tap } from 'rxjs';
import { User } from 'src/app/core/models/user';
import { ToastService } from 'src/app/core/services/toast.service';
import { loadFollowers, loadUser } from 'src/app/core/store/github.actions';
import { selectGitubUser, selectGithubUsers, selectGithubFollowers } from 'src/app/core/store/github.selector';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.scss']
})
export class UserDetailsComponent implements OnInit {
  user$ = new Observable<User>();
  followers$ = new Observable<User[]>();

  constructor(
    private store: Store,
    private route: ActivatedRoute,
    private toast: ToastService
    ) { }

  ngOnInit(): void {
    const username = this.route.snapshot.paramMap.get('username')
    if (username) {
      this.store.dispatch(loadUser({username : username}));
      this.store.dispatch(loadFollowers({username : username}));
    
    } else {
      this.toast.error('Error loading user');
    }

    this.user$ = this.store.select(selectGitubUser);
    this.followers$ = this.store.select(selectGithubFollowers);
  }

}
