import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatAutocompleteSelectedEvent, MatAutocompleteTrigger } from '@angular/material/autocomplete';
import { PageEvent } from '@angular/material/paginator';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, catchError, debounceTime, distinctUntilChanged, filter, map, of, switchMap } from 'rxjs';
import { Pagination } from '../core/interfaces/pagination';
import { User } from '../core/models/user';
import { GithubService } from '../core/services/github.service';
import { ToastService } from '../core/services/toast.service';
import * as GithubActions from '../core/store/github.actions';
import { selectGithubUsers } from '../core/store/github.selector';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  pagination: Pagination | undefined;
  pageNumber = 1;
  pageSize = 12;
  searchControl = new FormControl();
  searchTerm: string = '';
  searchResult$: Observable<User[]> | undefined;

  users$: Observable<User[]> = new Observable;

  constructor(
    private router: Router,
    private store: Store,
    private githubService: GithubService,
    private toast: ToastService
  ) { }

  ngOnInit(): void {
    this.pagination = {
      totalItems: 300,
      currentPage: 1,
      itemsPerPage: 12,
    }
    this.searchResult$ = this.searchControl.valueChanges.pipe(
      debounceTime(600),
      distinctUntilChanged(),
      filter(value => value && value.trim().length > 1),
      switchMap(value => this.githubService.searchUsers(value)),
      map(response => response.items),
      catchError(error => {
        this.toast.error('Error searching users, try again later');
        return of([]);
      })
    );
    this.store.dispatch(GithubActions.loadUsers({ pageSize: this.pagination.itemsPerPage, since: 0 }));
    this.users$ = this.store.select(selectGithubUsers);
  }

  onSelect(event: MatAutocompleteSelectedEvent) {
    this.router.navigate(['user/', event.option.value]);
  }

  pageChanged(event: PageEvent) {
    this.pageSize = event.pageSize;
    this.pagination!.currentPage = event.pageSize * event.pageIndex;
    this.store.dispatch(GithubActions.loadUsers({ pageSize: this.pageSize, since: this.pagination?.currentPage! }))
  }

  search(event: Event, trigger: MatAutocompleteTrigger) {
    event.preventDefault();
    trigger.closePanel();
    this.store.dispatch(GithubActions.search({ username: this.searchControl.value }))
  }
}
