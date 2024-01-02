import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { UserDetailsComponent } from './users/user-details/user-details.component';

const routes: Routes = [
  {
    path: '', component: HomeComponent
  },
  {
    path: 'search', component: HomeComponent
  },
  {
    path: 'user/:username',
    loadChildren: () => import('./users/users.module').then(m => m.UsersModule)
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
