import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HomeComponent } from './home/home.component';


import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';

import { ErrorInterceptor } from './core/interceptors/error.interceptor';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { EffectsModule } from '@ngrx/effects';
import { followersReducer, usersReducer, repositoriesReducer } from './core/store/github.reducers';
import { GithubEffects } from './core/store/github.effects';
import { GithubInterceptor } from './core/interceptors/github.interceptor';
import { environment } from 'src/environments/environment';
import { userReducer } from './users/state/user.reducers';
import { SharedModule } from './shared/shared.module';
import { UsersModule } from './users/users.module';
import { CommonModule } from '@angular/common';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSelectModule } from '@angular/material/select';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSliderModule } from '@angular/material/slider';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTabsModule } from '@angular/material/tabs';
import { MatToolbarModule } from '@angular/material/toolbar';
import { FOLLOWERS_FEATURE_KEY, USERS_FEATURE_KEY } from './core/interfaces/app.state';
import { USER_FEATURE_KEY } from './users/state/user.state';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    StoreModule.forRoot({
      [USERS_FEATURE_KEY]: usersReducer,
      [USER_FEATURE_KEY]: userReducer,
      [FOLLOWERS_FEATURE_KEY]: followersReducer,
      repositoriesState: repositoriesReducer,
    }),
    StoreDevtoolsModule.instrument({
      maxAge: 25,
      logOnly: environment.production,
    }),
    EffectsModule.forRoot([GithubEffects]),
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    CommonModule,

    SharedModule,
    UsersModule,

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
    MatPaginatorModule,
    MatTabsModule,
    MatDividerModule,
    MatProgressSpinnerModule,
    MatToolbarModule,
    MatSidenavModule,
    MatSlideToggleModule,
],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: GithubInterceptor, multi: true },
],
  bootstrap: [AppComponent]
})
export class AppModule { }
