import { GitHubRepository } from "../models/repository";

export interface RepositoryState {
    repositories: GitHubRepository[];
    loading: boolean;
    error: any;
}