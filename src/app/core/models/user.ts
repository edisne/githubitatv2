// export class User{
//     constructor(
//         login: string = '', id: number = 0, node_id: string = '', avatar_url: string = '', gravatar_id: string = '',
//         url: string = '', html_url: string = '', followers_url: string = '', following_url: string = '', gists_url: string = '',
//         starred_url: string = '', subscriptions_url: string = '', organizations_url: string = '', repos_url: string = '',
//         events_url: string = '', received_events_url: string = '', type: string = '', site_admin: boolean = false,
//         name: string = '', company: string = '', blog: string = '', location: string = '', email: string = '',
//         hireable: boolean = false, bio: string = '', twitter_username: string = '', public_repos: number = 0,
//         public_gists: number = 0, followers: number = 0, following: number = 0, created_at: string = '',
//         updated_at: string = '', private_gists: number = 0, total_private_repos: number = 0, owned_private_repos: number = 0,
//         disk_usage: number = 0, collaborators: number = 0, two_factor_authentication: boolean = false,
//         plan: { name: string, space: number, private_repos: number, collaborators: number } = { name: '', space: 0, private_repos: 0, collaborators: 0 }
//     ){}
// }; 

export interface User {
    login: string;
    id: number;
    node_id: string;
    avatar_url: string;
    gravatar_id: string;
    url: string;
    html_url: string;
    followers_url: string;
    following_url: string;
    gists_url: string;
    starred_url: string;
    subscriptions_url: string;
    organizations_url: string;
    repos_url: string;
    events_url: string;
    received_events_url: string;
    type: string;
    site_admin: boolean;
    name: string;
    company: string;
    blog: string;
    location: string;
    email: string;
    hireable: boolean;
    bio: string;
    twitter_username: string;
    public_repos: number;
    public_gists: number;
    followers: number;
    following: number;
    created_at: string;
    updated_at: string;
    private_gists: number;
    total_private_repos: number;
    owned_private_repos: number;
    disk_usage: number;
    collaborators: number;
    two_factor_authentication: boolean;
    plan: {
      name: string;
      space: number;
      private_repos: number;
      collaborators: number;
    };
}