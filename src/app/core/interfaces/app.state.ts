import { FollowersState } from "./followers-state";
import { RepositoryState } from "./repository-state";
import { UsersState } from "./users-state";

export const USERS_FEATURE_KEY = "usersState";
export const FOLLOWERS_FEATURE_KEY = "followersState"
export const REPOSITORIES_FEATURE_KEY = "repositoriesState"

export interface State {
    [USERS_FEATURE_KEY]: UsersState,
    [FOLLOWERS_FEATURE_KEY]: FollowersState,
    repositoriesState: RepositoryState
}