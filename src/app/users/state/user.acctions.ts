import { createAction, props } from "@ngrx/store";
import { User } from "src/app/core/models/user";

export const loadUser = createAction(
  '[User] Load User',
  props<{ username: string }>()
);

export const loadUserSuccess = createAction(
  '[User] Load User Success',
  props<{ user: User }>()
);

export const loadUserFailure = createAction(
  '[User] Load User Failure',
  props<{ error: string }>()
);