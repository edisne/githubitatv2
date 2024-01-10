import { AfterViewChecked, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { slideInAnimation } from './layout/animations';
import { Observable, combineLatest, map } from 'rxjs';
import { Store } from '@ngrx/store';
import {
  selectFollowersLoading,
  selectRepositoriesLoading,
  usersLoading
} from './core/store/github.selector';
import { FormControl } from '@angular/forms';
import { userLoading } from './users/state/user.selectors';
import { State } from './users/state/user.reducers';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [slideInAnimation]
})
export class AppComponent implements OnInit, AfterViewChecked{

  isLoading$: Observable<boolean>;
  title = 'Githubitat';
  toggleControl = new FormControl(false);
  isDarkSide : boolean = false;

  constructor(private store: Store<State>,
    private cdRef: ChangeDetectorRef) {
    this.isLoading$ = combineLatest([
      this.store.select(usersLoading),
      this.store.select(userLoading),
      this.store.select(selectRepositoriesLoading),
      this.store.select(selectFollowersLoading),
    ]).pipe(
      map(([
        loadingUsers,
        loadingUser,
        loadingRepositories,
        loadingFollowers]) => loadingUsers || loadingUser || loadingRepositories || loadingFollowers)
    );
  }
  ngOnInit(): void {
    this.toggleControl.valueChanges.subscribe(isDark => {
      this.isDarkSide = isDark;
   });
  }

  ngAfterViewChecked() {
    this.cdRef.detectChanges();
  }
}
