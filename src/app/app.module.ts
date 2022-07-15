import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MatSliderModule } from '@angular/material/slider';
import { HomeComponent } from './home/home.component';
import { TodoCardComponent } from './todo/todo-card/todo-card.component';
import { TodoFormComponent } from './todo/todo-form/todo-form.component';



@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    TodoCardComponent,
    TodoFormComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatSliderModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
