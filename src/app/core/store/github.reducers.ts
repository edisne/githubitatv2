import { createReducer, on } from '@ngrx/store';
import { loadUsers, loadUsersSuccess, loadUsersFailure, search, loadFollowers, loadFollowersSuccess, loadRepositories, loadRepositoriesSuccess, updateUser } from './github.actions';
import { FollowersState } from '../interfaces/followers-state';
import { RepositoryState } from '../interfaces/repository-state';
import { UsersState } from '../interfaces/users-state';
import { User } from '../models/user';

const userCreate = (users: User[], user: User) => [...users, user];
const userUpdate = (users: User[], changes: User) => 
    users.map(user => {
        return user.id === changes.id ? Object.assign({}, user, changes) : user;
    });
const userDelete = (users: User[], userId: number) => users.filter(user => user.id !== userId);

export const initialState: UsersState = {
  users: [],
  loading: false,
  error: null,
  activeUserId: 0,
};

export const initialFollowersState: FollowersState = {
  followers: [],
  loading: false,
  error: null
};

export const initialRepositoryState: RepositoryState = {
  repositories: [],
  loading: false,
  error: null
};


export const usersReducer = createReducer(
  initialState,
  on(loadUsers, state => ({ ...state, loading: true })),
  on(search, state => ({ ...state, loading: true })),
  on(loadUsersSuccess, (state, { users }) => ({ ...state, loading: false, users: users })),
  on(loadUsersFailure, (state, { error }) => ({ ...state, loading: false, error })),
  on(updateUser, (state, action) => ({
    ...state, 
    users: userUpdate(state.users, action.changes)
  }))
);

export const followersReducer = createReducer(
  initialFollowersState,
  on(loadFollowers, state => ({ ...state, loading: true })),
  on(loadFollowersSuccess, (state, { followers }) => ({ ...state, loading: false, followers: followers })),
);

export const repositoriesReducer = createReducer(
  initialRepositoryState,
  on(loadRepositories, state => ({ ...state, loading: true })),
  on(loadRepositoriesSuccess, (state, { repositories }) => (
    { ...state, loading: false, repositories : repositories }
    )),
);
