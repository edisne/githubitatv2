import { Component, OnInit } from "@angular/core";
import { FormControl } from "@angular/forms";
import { MatAutocompleteSelectedEvent, MatAutocompleteTrigger } from "@angular/material/autocomplete";
import { PageEvent } from "@angular/material/paginator";
import { Router, ActivatedRoute } from "@angular/router";
import { Store } from "@ngrx/store";
import { Observable, skip, debounceTime, distinctUntilChanged, filter, switchMap, map, catchError, of, exhaustMap, combineLatest, tap } from "rxjs";
import { User } from "../core/models/user";
import { GithubService } from "../core/services/github.service";
import { ToastService } from "../core/services/toast.service";
import { usersError, usersLoading, getUsers } from "../core/store/github.selector";
import { slideInAnimation } from "../layout/animations";
import * as GithubActions from "../core/store/github.actions";
import { State as GlobalState } from "../core/interfaces/app.state";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  animations: [slideInAnimation]
})
export class HomeComponent implements OnInit {

  pagination = {
    totalItems: 300,
    currentPage: 1,
    itemsPerPage: 12,
  }
  pageNumber = 1;
  pageSize = 12;
  searchControl = new FormControl();
  searchTerm: string = '';
  searchResult$: Observable<User[]> | undefined;

  users$ = this.store.select(getUsers);
  loading$ = this.store.select(usersLoading);
  error$ = this.store.select(usersError);

  constructor(
    private router: Router,
    private store: Store<GlobalState>,
    private githubService: GithubService,
    private toast: ToastService,
    private activatedRoute: ActivatedRoute
  ) { 
    this.router.routeReuseStrategy.shouldReuseRoute = function () {
      return false;
    };
  }

  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe(params => {
      if (params['username']) {
        this.store.dispatch(GithubActions.search({ username: params['username'] }));
      }
      else {
        this.store.dispatch(GithubActions.loadUsers({ pageSize: this.pagination.itemsPerPage, since: 0 }));
      }
    });

    this.searchResult$ = this.searchControl.valueChanges.pipe(
      skip(1),
      debounceTime(300),
      distinctUntilChanged(),
      filter(value => value && value.trim().length > 1),
      switchMap(value => this.githubService.searchUsers(value)),
      map(response => response.items),
      catchError(error => {
        this.toast.error('Error searching users, try again later');
        return of([]);
      })
    );

    /* Alternative way */
    // const allUsers$ = this.githubService.getUsers(10, 0);  

    // this.searchResult$ = combineLatest([
    //   allUsers$,
    //   this.searchControl.valueChanges
    // ]).pipe(
    //   map(([users, serachTerm]) =>
    //     users.filter((user : User) => user.login.includes(serachTerm))
    //   )
    // );
  }

  onSelect(event: MatAutocompleteSelectedEvent) {
    this.router.navigate(['user/', event.option.value]);
  }

  pageChanged(event: PageEvent) {
    this.pageSize = event.pageSize;
    this.pagination!.currentPage = event.pageSize * event.pageIndex;
    this.store.dispatch(GithubActions.loadUsers({ pageSize: this.pageSize, since: this.pagination?.currentPage! }))
  }

  search(event: Event, value:string, trigger: MatAutocompleteTrigger) {
    event.preventDefault();
    trigger.closePanel();
    this.router.navigate(['/search'], 
      {
        relativeTo: this.activatedRoute,
        queryParams: { username: value },
        queryParamsHandling: 'merge',
        replaceUrl: true
      }
    );
  }
}
