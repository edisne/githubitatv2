import { createSelector } from '@ngrx/store';
import { FollowersState, GithubState, UserState } from '../interfaces/github-state';

export const selectGithubFeature = (state: any) => state.github;
export const selectUserFeature = (state: any) => state.user;
export const selectUserFollowers = (state: any) => state.followers;

export const selectGithubUsers = createSelector(
  selectGithubFeature,
  (state: GithubState) => state.users,
);

export const selectGitubUser = createSelector(
  selectUserFeature,
  (state: UserState) => state.user,
)

export const selectGithubFollowers = createSelector(
  selectUserFollowers,
  (state: FollowersState) => state.followers,
)
