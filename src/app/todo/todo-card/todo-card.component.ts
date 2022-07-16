import { Component, Input, OnInit, Output } from '@angular/core';
import { Todo } from 'src/app/core/models/todo';


@Component({
  selector: 'app-todo-card',
  templateUrl: './todo-card.component.html',
  styleUrls: ['./todo-card.component.scss']
})
export class TodoCardComponent implements OnInit {
  
  @Input() todo: Todo = new Todo();

  constructor() { }

  ngOnInit(): void {
  }

}
