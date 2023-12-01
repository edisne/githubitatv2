import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouteReuseStrategy, RouterModule } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { TodoCardComponent } from './todo/todo-card/todo-card.component';
import { TodoFormComponent } from './todo/todo-form/todo-form.component';

import { environment } from '../environments/environment';

import { MatSliderModule } from '@angular/material/slider';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatButtonModule} from '@angular/material/button';
import { MatIconModule} from '@angular/material/icon';
import { MatNativeDateModule } from '@angular/material/core';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatDialogModule } from '@angular/material/dialog';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatSelectModule } from '@angular/material/select';

import { PaginationModule } from 'ngx-bootstrap/pagination';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';

import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireDatabaseModule } from '@angular/fire/compat/database';
import { RegisterComponent } from './auth/register/register.component';
import { LoginComponent } from './auth/login/login.component';
import { JwtInterceptor } from './core/interceptors/jwt.interceptor';
import { ConfirmDialogComponent } from './shared/confirm-dialog/confirm-dialog/confirm-dialog.component';
import { ColorPickerDialogComponent } from './shared/color-picker-dialog/color-picker-dialog/color-picker-dialog.component';
import { ColorPickerModule } from 'ngx-color-picker';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    TodoCardComponent,
    TodoFormComponent,
    RegisterComponent,
    LoginComponent,
    ConfirmDialogComponent,
    ColorPickerDialogComponent,
  ],
  imports: [
    RouterModule.forRoot([
      { path:'', component: HomeComponent},
      { path:'todo/add', component: TodoFormComponent},
      { path:'todo/edit/:id', component: TodoFormComponent},
      { path:'login', component: LoginComponent},
      { path:'register', component: RegisterComponent},
    ]),

    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,

    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
    AngularFireModule,

    MatSliderModule,
    MatCardModule,
    MatChipsModule,
    MatDatepickerModule,
    MatButtonModule,
    MatIconModule,
    MatNativeDateModule,
    MatInputModule,
    MatSnackBarModule,
    MatDialogModule,
    MatAutocompleteModule,
    MatSelectModule,

    PaginationModule,
    ColorPickerModule,
  ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true},
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
