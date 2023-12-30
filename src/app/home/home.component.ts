import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, catchError, debounceTime, distinctUntilChanged, filter, map, of, switchMap } from 'rxjs';
import { User } from '../core/models/user';
import { Pagination } from '../core/interfaces/pagination';
import { PageChangedEvent } from 'ngx-bootstrap/pagination';
import { FormControl } from '@angular/forms';
import { Store } from '@ngrx/store';
import * as GithubActions from '../core/store/github.actions';
import { selectGithubUsers } from '../core/store/github.selector';
import { GithubService } from '../core/services/github.service';
import { MatAutocompleteTrigger } from '@angular/material/autocomplete';
import { ToastService } from '../core/services/toast.service';
import { PageEvent } from '@angular/material/paginator';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  pagination: Pagination | undefined;
  pageNumber = 1;
  pageSize = 10;
  searchControl = new FormControl();
  searchTerm: string = '';
  searchResult$ : Observable<User[]> | undefined;

  users$: Observable<User[]> = new Observable;


  constructor(
    private router: Router,
    private store: Store,
    private githubService: GithubService,
    private toast: ToastService
    ) { }

  ngOnInit(): void {
    this.pagination = {
      totalItems :300,
      currentPage : 1,
      itemsPerPage : 10,
      totalPages : 10,
    }
    this.searchResult$ = this.searchControl.valueChanges.pipe(
      debounceTime(600),
      distinctUntilChanged(),
      filter(value => value && value.trim().length > 2),
      switchMap(value => this.githubService.searchUsers(value)),
      map(response => response.items),
      catchError(error => {
        this.toast.error('Error searching users, try again later');
        return of([]);
      })
    );
    this.store.dispatch(GithubActions.loadUsers({pageSize: 10, since: 0}));
    this.users$ = this.store.select(selectGithubUsers);
  }

  onClicked(user: User) {
    // this.router.navigate(['todo/edit/', id]);
  }

  // pageChanged(event: PageChangedEvent) {
  //   if (this.pageNumber !== event.page) {
  //     this.pageNumber = event.page;
  //     // this.store.dispatch(GithubActions.loadGithubUsers());
  //   }
  // }

  onSelect() {
    // this.loadTodos(); 
  }

  pageChanged(event: PageEvent) {
    this.pageSize = event.pageSize;
    this.pagination!.currentPage = event.pageSize * event.pageIndex;
    this.store.dispatch(GithubActions.loadUsers({pageSize: this.pageSize, since: this.pagination?.currentPage!}))
  }

  search(event: Event, trigger: MatAutocompleteTrigger) {
    trigger.closePanel();
    this.store.dispatch(GithubActions.search({username : this.searchControl.value}))
  }
}
