import { User } from "../models/user";

export interface GithubState {
    users: User[];
    loading: boolean;
    error: any; 
}

export interface UserState {
    user: User;
    loading: boolean;
}

export interface FollowersState {
    followers: User[];
    loading: boolean;
    error: any; 
}