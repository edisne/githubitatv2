import {Component, OnInit, ElementRef, ViewChild} from '@angular/core';
import { NgForm } from '@angular/forms';
import {FormControl} from '@angular/forms';
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import { Todo } from 'src/app/core/models/todo';

@Component({
  selector: 'app-todo-form',
  templateUrl: './todo-form.component.html',
  styleUrls: ['./todo-form.component.scss']
})
export class TodoFormComponent implements OnInit {


  separatorKeysCodes: number[] = [ENTER, COMMA];
  addOnBlur = true;
  fruitCtrl = new FormControl('');
  fruits: string[] = ['Lemon'];
  allFruits: string[] = ['Apple', 'Lemon', 'Lime', 'Orange', 'Strawberry'];

  selectedDate: any;
  todo:Todo = new Todo;

  constructor() {

  }

  ngOnInit(): void {
    
  }
  add(event: any): void {
    const value = (event.value || '').trim();

    // Add our fruit
    if (value) {
      this.fruits.push(value);
    }

    // Clear the input value
    event.chipInput!.clear();

    this.fruitCtrl.setValue(null);
  }
  
  remove(fruit: string): void {
    const index = this.fruits.indexOf(fruit);

    if (index >= 0) {
      this.fruits.splice(index, 1);
    }
  }

  onSubmit(form:NgForm){
    console.log(form.value);
    console.log(this.fruits);
    console.log(this.selectedDate);
  }
}
