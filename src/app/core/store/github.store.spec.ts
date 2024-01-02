import { User } from '../models/user';
import * as GithubActions from './github.actions';
import { githubReducer, initialState } from './github.reducer';
import * as fromSelectors from './github.selector';


describe('loadUsers', () => {
    it('should create an action to load users', () => {
        const pageSize = 10;
        const since = 100;
        const action = GithubActions.loadUsers({ pageSize, since });
        expect({ ...action }).toEqual({
            type: '[GitHub API] Load Users',
            pageSize,
            since
        });
    });
});

describe('loadFollowers', () => {
    it('should create an action to load followers', () => {
        const username = 'testuser';
        const action = GithubActions.loadFollowers({ username });
        expect({ ...action }).toEqual({
            type: '[GitHub API] Load Followers',
            username
        });
    });
});


describe('Github Reducer', () => {
    it('should return the initial state', () => {
        const action = {} as any;
        const state = githubReducer(undefined, action);
        expect(state).toBe(initialState);
    });

    it('should update state on loadUsersSuccess', () => {
        const users: User[] = [
            {
                login: 'test',
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
            }
        ];
        const action = GithubActions.loadUsersSuccess({ users });
        const state = githubReducer(initialState, action);
        expect(state.users).toEqual(users);
    });
});

describe('Github Selectors', () => {
    it('should select the github users', () => {
        const initialState = {
            github: {
                users: [{
                    login: 'test',
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
                }],
                loading: false,
                error: null
            },
        };

        const result = fromSelectors.selectGithubUsers(initialState);
        expect(result).toEqual([{
            login: 'test',
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
        }]);
    });
});