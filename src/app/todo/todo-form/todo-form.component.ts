import { Component, OnInit, ElementRef, ViewChild, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { FormControl } from '@angular/forms';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { Todo } from 'src/app/core/models/todo';
import { TodoStore } from 'src/app/core/stores/todo.store';
import { ActivatedRoute } from '@angular/router';
import { Observable, Subscription } from 'rxjs';

export interface Tag {
  title: string,
  color: string
}

@Component({
  selector: 'app-todo-form',
  templateUrl: './todo-form.component.html',
  styleUrls: ['./todo-form.component.scss']
})
export class TodoFormComponent implements OnInit, OnDestroy {


  separatorKeysCodes: number[] = [ENTER, COMMA];
  addOnBlur = true;

  tagCtrl = new FormControl('');
  tags: Tag[] = [];
  availableColors: string[] = ['primary', 'accent', 'warn'];

  selectedDate: any;
  id: any;
  todo: any;
  todoSubscription = new Subscription;
  todoStoreSubscription = new Subscription;
  successAdd: any;
  successUpdate:any;
  error: any;


  constructor(private todoStore: TodoStore,
    private activatedRoute: ActivatedRoute) { }

  ngOnDestroy(): void {
    this.todoSubscription.unsubscribe();
    this.todoStoreSubscription.unsubscribe();
  }

  ngOnInit(): void {
    this.todo = new Todo();
    this.id = this.activatedRoute.snapshot.paramMap.get("id");
    if (this.id) {
      this.todoSubscription = this.todoStore.getById(this.id).subscribe(todo => {
        this.todo = todo;
      });
    }
  }
  add(event: any): void {
    const value = (event.value || '').trim();
    if (value) {
      let tag: Tag = {
        title: value,
        color: this.getRandomColor()
      }
      this.todo.tags.push(tag);
    }
    event.chipInput!.clear();
    this.tagCtrl.setValue(null);
  }

  remove(tag: Tag): void {
    const index = this.tags.indexOf(tag);
    if (index >= 0) {
      this.tags.splice(index, 1);
    }
  }

  getRandomColor() {
    return this.availableColors[Math.floor(Math.random() * this.availableColors.length)]
  }

  onSubmit(form: NgForm) {
    console.log(this.todo.date);
    if (!this.id) {
      let todo: Todo = {
        date: new Date(this.todo.date),
        title: form.value.title,
        description: form.value.description,
        project: form.value.project,
        tags: this.todo.tags,
      }

      this.todoStoreSubscription = this.todoStore.add(todo).subscribe({
        next: (v) => {
          this.successAdd = true;
        },
        error: (e) => {
          this.error = e;
        },
      });
      this.todo.tags = [];
      form.reset();
    } else
      this.todoStoreSubscription =this.todoStore.update(this.todo).subscribe({
        next: (v) => {
          this.successUpdate = true;
        },
        error: (e) => {
          this.error = e;
        },
      });

    window.scroll({
      top: 0,
      left: 0,
      behavior: 'smooth'
    });

  }
}
