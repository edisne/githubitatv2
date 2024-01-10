import { User } from "../models/user";

export interface FollowersState {
    followers: User[];
    loading: boolean;
    error: string | null;
}