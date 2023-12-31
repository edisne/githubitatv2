import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, Subscription, switchMap, tap } from 'rxjs';
import { GitHubRepository } from 'src/app/core/models/repository';
import { User } from 'src/app/core/models/user';
import { ToastService } from 'src/app/core/services/toast.service';
import { loadFollowers, loadRepositories, loadUser } from 'src/app/core/store/github.actions';
import { selectGitubUser, selectGithubFollowers, selectGithubRepositories } from 'src/app/core/store/github.selector';
import { slideInAnimation } from 'src/app/layout/animations';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.scss'],
  animations: [slideInAnimation]
})
export class UserDetailsComponent implements OnInit, OnDestroy {
  user$ = new Observable<User>();
  followers$ = new Observable<User[]>();
  repositories$ = new Observable<GitHubRepository[]>();
  private routeParamSubscription: Subscription | undefined;
  animateState: string = '';

  constructor(
    private store: Store,
    private route: ActivatedRoute,
    private toast: ToastService,
    private router: Router,
  ) {
    this.router.routeReuseStrategy.shouldReuseRoute = function () {
      return false;
    };
  }

  ngOnInit(): void {
    this.routeParamSubscription = this.route.paramMap.pipe(
      switchMap(params => {
        const username = params.get('username');
        this.animateState = username!;
        return username ? [username] : [];
      })
    ).subscribe(username => {
      if (username) {
        this.store.dispatch(loadUser({ username }));
        this.store.dispatch(loadFollowers({ username }));
        this.store.dispatch(loadRepositories({ username }));
      } else {
        this.toast.error('Error loading user');
      }
    });

    this.user$ = this.store.select(selectGitubUser);
    this.followers$ = this.store.select(selectGithubFollowers);
    this.repositories$ = this.store.select(selectGithubRepositories)
  }

  showUserDetails(user: User) {
    this.router.navigate(['user/', user.login]);
  }

  ngOnDestroy(): void {
    if (this.routeParamSubscription) {
      this.routeParamSubscription.unsubscribe();
    }
  }

}
