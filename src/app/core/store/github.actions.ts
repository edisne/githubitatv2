import { createAction, props } from '@ngrx/store';
import { User } from '../models/user';


export const loadUsers = createAction(
  '[GitHub API] Load Users',
  props<{ pageSize: number, since: number }>()
);

export const loadFollowers = createAction(
  '[GitHub API] Load Followers',
  props<{ username: string }>()
);

export const loadFollowersSuccess = createAction(
  '[GitHub API] Load Followers Success',
  props<{ followers: User[] }>()
);

export const loadGithubUsersSuccess = createAction(
  '[GitHub API] Load Users Success',
  props<{ users: User[] }>()
);

export const loadGithubUsersFailure = createAction(
  '[GitHub API] Load Users Failure',
  props<{ error: any }>()
);

export const search = createAction(
  '[GitHub API] Load Users',
  props<{ username: string }>()
);

export const loadUser = createAction(
  '[GitHub API] Load User',
  props<{ username: string }>()
);

export const loadUserSuccess = createAction(
  '[GitHub API] Load Users Success',
  props<{ user: User }>()
);

