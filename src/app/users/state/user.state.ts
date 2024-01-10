import { User } from "../../core/models/user";

export const USER_FEATURE_KEY = 'user'

export interface UserState {
    user: User;
    loading: boolean;
    error: string | null;
}