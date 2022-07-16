import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TodoStore } from '../core/stores/todo.store';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  todos$:any;

  constructor(private todoStore:TodoStore,
              private router:Router) { }

  ngOnInit(): void {
    this.todos$ = this.todoStore.get();
  }
  onClicked(id:string){
    this.router.navigate(['todo/edit/',id]);
  }

}
