import { createReducer, on } from '@ngrx/store';
import { loadUsers, loadUsersSuccess, loadUsersFailure, search, loadUser, loadUserSuccess, loadFollowers, loadFollowersSuccess, loadRepositories, loadRepositoriesSuccess } from './github.actions';
import { FollowersState, GithubState as UsersState, RepositoryState, UserState } from '../interfaces/github-state';


export const initialState: UsersState = {
  users: [],
  loading: false,
  error: null
};

export const initialUserState: UserState = {
  user: {
    login: '',
    id: 0,
    node_id: '',
    avatar_url: '',
    gravatar_id: '',
    url: '',
    html_url: '',
    followers_url: '',
    following_url: '',
    gists_url: '',
    starred_url: '',
    subscriptions_url: '',
    organizations_url: '',
    repos_url: '',
    events_url: '',
    received_events_url: '',
    type: '',
    site_admin: false,
    name: '',
    company: '',
    blog: '',
    location: '',
    email: '',
    hireable: false,
    bio: '',
    twitter_username: '',
    public_repos: 0,
    public_gists: 0,
    followers: 0,
    following: 0,
    created_at: '',
    updated_at: '',
    private_gists: 0,
    total_private_repos: 0,
    owned_private_repos: 0,
    disk_usage: 0,
    collaborators: 0,
    two_factor_authentication: false,
    plan: {
      name: '',
      space: 0,
      private_repos: 0,
      collaborators: 0
    }
  },
  loading: false,
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


export const githubReducer = createReducer(
  initialState,
  on(loadUsers, state => ({ ...state, loading: true })),
  on(search, state => ({ ...state, loading: true })),
  on(loadUsersSuccess, (state, { users }) => ({ ...state, loading: false, users: users })),
  on(loadUsersFailure, (state, { error }) => ({ ...state, loading: false, error })),
);

export const userReducer = createReducer(
  initialUserState,
  on(loadUser, state => ({ ...state, loading: true })),
  on(loadUserSuccess, (state, { user }) => ({ ...state, loading: false, user: user })),
);

export const followersReducer = createReducer(
  initialFollowersState,
  on(loadFollowers, state => ({ ...state, loading: true })),
  on(loadFollowersSuccess, (state, { followers }) => ({ ...state, loading: false, followers: followers })),
);

export const repositoriesReducer = createReducer(
  initialRepositoryState,
  on(loadRepositories, state => ({ ...state, loading: true })),
  on(loadRepositoriesSuccess, (state, { repositories }) => ({ ...state, loading: false, repositories: repositories })),
);
