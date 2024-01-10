import { createReducer, on } from "@ngrx/store";
import { loadUser, loadUserFailure, loadUserSuccess } from "./user.acctions";
import { UserState } from "./user.state";
import * as AppState from "../../core/interfaces/app.state"

export interface State extends AppState.State {
    user: UserState;
}

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
    error: null,
};

export const userReducer = createReducer(
    initialUserState,
    on(loadUser, state => ({ ...state, loading: true })),
    on(loadUserSuccess, (state, { user }) => ({ ...state, loading: false, user: user })),
    on(loadUserFailure, (state, action) => ({...state, loading: false, error: action.error})),
);