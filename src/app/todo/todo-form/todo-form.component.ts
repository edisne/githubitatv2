import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatCalendar} from '@angular/material/datepicker';
import { Todo } from 'src/app/core/models/todo';

@Component({
  selector: 'app-todo-form',
  templateUrl: './todo-form.component.html',
  styleUrls: ['./todo-form.component.scss']
})
export class TodoFormComponent implements OnInit {


  //@ViewChild('calendar') calendar: MatCalendar<any>;
  selectedDate: any;
  todo:Todo = new Todo;

  constructor() {

  }

  ngOnInit(): void {
    
  }
  
  onSubmit(form:NgForm){

  }
}
