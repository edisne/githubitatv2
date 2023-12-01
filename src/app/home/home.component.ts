import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription, debounceTime, distinctUntilChanged, shareReplay, switchMap, tap } from 'rxjs';
import { User } from '../core/models/user';
import { AuthService } from '../core/services/auth.service';
import { TodoStore } from '../core/stores/todo.store';
import { TodoService } from '../core/services/todo.service';
import { Todo } from '../core/models/todo';
import { Pagination } from '../core/interfaces/pagination';
import { PageChangedEvent } from 'ngx-bootstrap/pagination';
import { FormControl } from '@angular/forms';
import { Tag } from '../todo/todo-form/todo-form.component';
import { MatSelectChange } from '@angular/material/select';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  todos: Todo[] = [];
  tags: Tag[] = [];
  tagsAcc: any = new Map<string, Tag>();
  subscription = new Subscription;
  isAuthenticated: any;
  user: any;
  pagination: Pagination | undefined;
  pageNumber = 1;
  pageSize = 4;
  
  searchControl = new FormControl();
  searchResultTodos: Todo[] = [];
  searchTerm: string = '';

  tagFilter: string = '';

  constructor(private todoService: TodoService,
    private router: Router,
    private authService: AuthService) { }

  ngOnInit(): void {
    let u = localStorage.getItem('user');
    if (u) {
      this.user = JSON.parse(u);
    }
    else {
      this.router.navigate(['/login']);
    }
    this.searchControl.valueChanges.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      tap(term => this.searchTerm = term),
      switchMap(term => this.todoService.getAll(this.pageNumber, this.pageSize, term, this.tagFilter)),
      shareReplay(1)
    ).subscribe (results => this.searchResultTodos = results.result!)
    this.loadTodos();  
  }

  loadTodos() {
    this.todoService.getAll(this.pageNumber, this.pageSize, this.searchTerm, this.tagFilter).subscribe({
      next: (response) => {
        if (response.result) {
          this.todos = response.result;
          this.todos.reduce((accumulator, todo) => {
            todo.tags.forEach(tag => {
              if (!accumulator.has(tag.title)) {
                accumulator.set(tag.title, tag);
              }
            });
            return accumulator;
          }, this.tagsAcc)
          this.tags = [...this.tagsAcc.values()];
          this.pagination = response.pagination;
        }
      }
    });
  }

  onClicked(id: string) {
    this.router.navigate(['todo/edit/', id]);
  }

  pageChanged(event: PageChangedEvent) {
    if (this.pageNumber !== event.page) {
      this.pageNumber = event.page;
      this.loadTodos(); 
    }
  }

  onSelect() {
    this.loadTodos(); 
  }
}
