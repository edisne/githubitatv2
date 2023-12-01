import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { FormControl } from '@angular/forms';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { Todo } from 'src/app/core/models/todo';
import { TodoStore } from 'src/app/core/stores/todo.store';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Location } from '@angular/common';
import { TodoService } from 'src/app/core/services/todo.service';
import { IServiceResponse } from 'src/app/core/interfaces/serviceResponse';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ToastService } from 'src/app/core/services/toast.service';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from 'src/app/shared/confirm-dialog/confirm-dialog/confirm-dialog.component';
import { CanComponentDeactivate } from 'src/app/core/interfaces/can-component-deactivate';
import { DateAdapter } from '@angular/material/core';
import { ColorPickerDialogComponent } from 'src/app/shared/color-picker-dialog/color-picker-dialog/color-picker-dialog.component';
import { TagService } from 'src/app/core/services/tag.service';

export interface Tag {
  title: string,
  color: string
}

@Component({
  selector: 'app-todo-form',
  templateUrl: './todo-form.component.html',
  styleUrls: ['./todo-form.component.scss']
})
export class TodoFormComponent implements OnInit, OnDestroy, CanComponentDeactivate {
  @ViewChild ('f') f: NgForm | undefined;

  separatorKeysCodes: number[] = [ENTER, COMMA];
  addOnBlur = true;

  tagCtrl = new FormControl('');
  tags: Tag[] = [];
  initialTags: string | undefined;
  availableColors: string[] = ['primary', 'accent', 'warn'];

  selectedDate: any;
  id: any;
  todo: any;
  todoSubscription = new Subscription;
  todoStoreSubscription = new Subscription;
  successAdd: any;
  successUpdate: any;
  successDelete: any;
  error: any;
  user: any;

  isSubmited: boolean = false;

  constructor(private todoService: TodoService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private toast: ToastService,
    private dialog: MatDialog,
    private tagService: TagService,
  ) { }

  ngOnDestroy(): void {
    this.todoSubscription.unsubscribe();
    this.todoStoreSubscription.unsubscribe();
  }

  ngOnInit(): void {
    this.todo = new Todo();
    this.id = this.activatedRoute.snapshot.paramMap.get("id");
    if (this.id) {
      this.todoService.get(this.id).subscribe({
        next: (response: IServiceResponse<Todo>) =>  {
          this.todo = response.data;
          this.todo.image = 'data:image/jpeg;base64,' + response.data?.image;
          this.initialTags = JSON.stringify(this.todo.tags);
        }, 
        error: (e) => console.log(e)
      })
    }
  }
  add(event: any): void {
    const value = (event.value || '').trim();
    if (value) {
      this.tagService.getAll().subscribe({
        next: (response : IServiceResponse<Tag[]>)  => {
          const exist = response.data?.find(tag => tag.title === value);
          if(exist) {
            this.toast.error("Tag with the same title already exist");
            return;
          }
          const dialogRef = this.dialog.open(ColorPickerDialogComponent)
          dialogRef.afterClosed().subscribe( color => {
            if (color) {
              let tag: Tag = {
                title: value,
                color: color
              }
              this.todo.tags.push(tag);
            }
          })  
        },
        complete: () => {
          event.chipInput!.clear();
          this.tagCtrl.setValue(null);
        }
      })
    }
  }

  remove(tag: Tag): void {
    const index = this.todo.tags.indexOf(tag);
    if (index >= 0) {
      this.todo.tags.splice(index, 1);
    }
  }

  getRandomColor() {
    return this.availableColors[Math.floor(Math.random() * this.availableColors.length)]
  }

  onSubmit(form: NgForm) {
    let u = localStorage.getItem("user");
    if (u) {
      this.user = JSON.parse(u);
    }

    if (!this.id) {
      let todo: Todo = {
        date: this.todo.date,
        title: form.value.title,
        description: form.value.description,
        project: form.value.project,
        tags: this.todo.tags,
        userId: this.user.id,
        image: this.todo.image
      }

      this.todoService.save(todo).subscribe({
        next: (v) => {
          this.isSubmited = true;
          this.toast.success("Successfuly added Task");
          this.router.navigate(['/']);
        },
        error: (e) => {
          console.log(e);
          this.error = e;
        },
      });
      this.todo.tags = [];
      form.reset();
    } else
      this.todoService.update(this.todo).subscribe({
        next: (v) => {
          this.isSubmited = true;
          this.toast.success("Successfuly updated Task");
          this.router.navigate(['/']);
        },
        error: (e) => {
          console.log(e);
          this.error = e;
        },
      });

    window.scroll({
      top: 0,
      left: 0,
      behavior: 'smooth'
    });
  }

  onDelete() {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: {
        type: "delete",
        header: "Delete file",
        todo: this.todo.title
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result === 'Yes') {
        this.todoService.delete(this.todo.id).subscribe({
          next: (t) => {
            this.toast.success("Successfully deleted task");
            this.router.navigate(["/"]);
          },
          error: (e) => {
            this.toast.error("Error deleting task");
            this.error = e;
          }
        });
      }
    });
  }

  onBack(event : any) {
    this.router.navigate(['/']);
  }

  hasUnsavedChanges(): boolean {
    return this.f?.dirty! || JSON.stringify(this.todo.tags) !== this.initialTags;
  }
}