import { Actions, createEffect, ofType } from "@ngrx/effects";
import { switchMap, map } from "rxjs";
import { loadUser, loadUserSuccess } from "./user.acctions";
import { Injectable } from "@angular/core";
import { GithubService } from "src/app/core/services/github.service";

@Injectable()
export class UserEffects{
    loadUser$ = createEffect(() => this.actions$.pipe(
        ofType(loadUser),
        switchMap(action =>
          this.githubService.getUserDetails(action.username).pipe(
            map(user => loadUserSuccess({ user }))
          )
        )
      ));

      constructor(private actions$: Actions, private githubService : GithubService){}
}
