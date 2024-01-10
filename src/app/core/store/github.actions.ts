import { createAction, props } from '@ngrx/store';
import { User } from '../models/user';
import { GitHubRepository } from '../models/repository';


export const loadUsers = createAction(
  '[GitHub API] Load Users',
  props<{ pageSize: number, since: number }>()
);

export const loadUsersSuccess = createAction(
  '[GitHub API] Load Users Success',
  props<{ users: User[] }>()
);

export const loadUsersFailure = createAction(
  '[GitHub API] Load Users Failure',
  props<{ error: string | null }>()
);

export const loadFollowers = createAction(
  '[GitHub API] Load Followers',
  props<{ username: string }>()
);

export const loadFollowersSuccess = createAction(
  '[GitHub API] Load Followers Success',
  props<{ followers: User[] }>()
);

export const search = createAction(
  '[GitHub API] Search Users',
  props<{ username: string }>()
);

export const loadRepositories = createAction(
  '[GitHub API] Load Repositories',
  // props<{ username: string }>()
  (username : string) => ({ username })
);

export const loadRepositoriesSuccess = createAction(
  '[GitHub API] Load Repositories Success',
  props<{ repositories: GitHubRepository[] }>()
);

export const updateUser = createAction(
  '[Users] Update users',
  props<{ changes: User}>()
)

