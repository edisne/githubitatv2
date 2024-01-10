import { createFeatureSelector, createSelector } from '@ngrx/store';
import { FollowersState } from '../interfaces/followers-state';
import { RepositoryState } from '../interfaces/repository-state';
import { UsersState } from '../interfaces/users-state';
import { FOLLOWERS_FEATURE_KEY, REPOSITORIES_FEATURE_KEY, State, USERS_FEATURE_KEY } from '../interfaces/app.state';
import { calculateTotalFollowers } from '../models/user';

// export const selectUsersState = (state: State) => state.usersState;
// export const SelectFollowersState = (state: State) => state.followersState;
// export const selectRepositoriesState = (state: State) => state.repositoriesState;

const getUsersFeatureState = createFeatureSelector<UsersState>(USERS_FEATURE_KEY); //Feature selector
const getRepositoriesState = createFeatureSelector<RepositoryState>(REPOSITORIES_FEATURE_KEY); //Feature selector
const getFollowersState = createFeatureSelector<FollowersState>(FOLLOWERS_FEATURE_KEY); //Feature selector
/**
 * Selector can be viewed as view model mapper
 */

export const getUsers = createSelector(
  getUsersFeatureState,
  (state: UsersState) => state.users,
);

export const usersLoading = createSelector(
  getUsersFeatureState,
  (state: UsersState) => state.loading
);

export const usersError = createSelector(
  getUsersFeatureState,
  (state: UsersState) => state.error,
);

export const selectGithubFollowers = createSelector(
  getFollowersState,
  (state: FollowersState) => state.followers,
);

export const selectFollowersLoading = createSelector(
  getFollowersState,
  (state: FollowersState) => state.loading
);

export const selectGithubRepositories = createSelector(
  getRepositoriesState,
  (state: RepositoryState) => state.repositories,
);

export const selectRepositoriesLoading = createSelector(
  getRepositoriesState,
  (state: RepositoryState) => state.loading
);

/**
 * Getter selectors
 */

export const selectAllUsers = (state: State) => state.usersState.users;
export const selectActiveUserId = (state:State) => state.usersState.activeUserId;

export const selectActiveUser = createSelector(
  selectAllUsers,
  selectActiveUserId,
  (allUsers, activeUserId) => allUsers.find(user => user.id === activeUserId)
)

export const selectFollowersTotal = createSelector(
  selectAllUsers,
  calculateTotalFollowers
)