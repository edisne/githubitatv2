import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './home/home.component';

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
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatTabsModule} from '@angular/material/tabs';
import {MatDividerModule} from '@angular/material/divider';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {MatSidenavModule} from '@angular/material/sidenav'

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';

import { ErrorInterceptor } from './core/interceptors/error.interceptor';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { followersReducer, githubReducer, repositoriesReducer, userReducer } from './core/store/github.reducer';
import { GithubEffects } from './core/store/github.effects';
import { UserCardComponent } from './shared/user-card/user-card.component';
import { UserDetailsComponent } from './users/user-details/user-details.component';
import { RepositoryCardComponent } from './shared/repository-card/repository-card.component';

const routes: Routes = [
  { path:'', component: HomeComponent},
  {
    path: 'user/:username',
    loadChildren: () => import('./users/users.module').then(m => m.UsersModule)
  },
];

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    UserCardComponent,
    UserDetailsComponent,
    RepositoryCardComponent,
  ],
  imports: [
    RouterModule.forRoot(routes),
    BrowserModule,
    StoreModule.forRoot({
      github: githubReducer,
      user: userReducer,
      followers: followersReducer,
      repositories: repositoriesReducer,
    }),
    EffectsModule.forRoot([GithubEffects]),
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,

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
    {provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true},
],
  bootstrap: [AppComponent]
})
export class AppModule { }
