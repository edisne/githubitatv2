import { createFeatureSelector, createSelector } from "@ngrx/store";
import { USER_FEATURE_KEY, UserState } from "./user.state";

const getUserFeature = createFeatureSelector<UserState>(USER_FEATURE_KEY)

export const userLoading = createSelector(
    getUserFeature,
    (state: UserState) => state.loading
);

export const userSuccess = createSelector(
    getUserFeature, //up to 8 selector
    (state: UserState) => state.user, //projection function
);