import { NgModule } from '@angular/core';
import { UserDetailsComponent } from './user-details/user-details.component';
import { RouterModule, Routes } from '@angular/router';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { UserEffects } from './state/user.effects';
import { userReducer } from './state/user.reducers';
import { USER_FEATURE_KEY } from './state/user.state';
import { SharedModule } from '../shared/shared.module';
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
import { CommonModule } from '@angular/common';

const routes: Routes = [
  { path: '', component: UserDetailsComponent },
];

@NgModule({
  declarations: [UserDetailsComponent],
  imports: [
    SharedModule,
 
    StoreModule.forFeature(
      USER_FEATURE_KEY, userReducer),
    EffectsModule.forFeature([UserEffects]),
    CommonModule,

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
  exports: [
    UserDetailsComponent,
  ]
})
export class UsersModule { } 
