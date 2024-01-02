import { createAction, props } from '@ngrx/store';
import { User } from '../models/user';
import { GitHubRepository } from '../models/repository';


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

export const loadUsersSuccess = createAction(
  '[GitHub API] Load Users Success',
  props<{ users: User[] }>()
);

export const loadUsersFailure = createAction(
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

export const loadRepositories = createAction(
  '[GitHub API] Load Repositories',
  props<{ username: string }>()
);

export const loadRepositoriesSuccess = createAction(
  '[GitHub API] Load Repositories Success',
  props<{ repositories: GitHubRepository[] }>()
);

