import { createSelector } from '@ngrx/store';
import { FollowersState, GithubState, RepositoryState, UserState } from '../interfaces/github-state';

export const selectGithubFeature = (state: any) => state.github;
export const selectUserFeature = (state: any) => state.user;
export const selectUserFollowers = (state: any) => state.followers;
export const selectUserRepositories = (state: any) => state.repositories;

export const selectGithubUsers = createSelector(
  selectGithubFeature,
  (state: GithubState) => state.users,
);

export const selectGitubUser = createSelector(
  selectUserFeature,
  (state: UserState) => state.user,
);

export const selectGithubFollowers = createSelector(
  selectUserFollowers,
  (state: FollowersState) => state.followers,
);

export const selectGithubRepositories = createSelector(
  selectUserRepositories,
  (state: RepositoryState) => state.repositories,
);

export const selectUsersLoading = createSelector(
  selectGithubFeature,
  (state: GithubState) => state.loading
);

export const selectUserLoading = createSelector(
  selectUserFeature,
  (state: UserState) => state.loading
);

export const selectRepositoriesLoading = createSelector(
  selectUserRepositories,
  (state: RepositoryState) => state.loading
);

export const selectFollowersLoading = createSelector(
  selectUserFollowers,
  (state: FollowersState) => state.loading
);