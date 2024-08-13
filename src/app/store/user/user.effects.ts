import { Injectable } from "@angular/core"
import { HttpClient } from '@angular/common/http'
import { Router } from "@angular/router"
import { of, take, tap } from 'rxjs'
import { catchError, map, mergeMap, switchMap } from "rxjs"

import { createEffect, Actions, ofType } from "@ngrx/effects"
import * as userActions from "./user.actions"
import { User, UserLogin } from "../../models/user.model"
import { usersApiUrl, loginApiUrl } from "../../utils/constants"
import { Store } from "@ngrx/store"

@Injectable()

export class UserEffects {

    constructor(private store: Store, private http: HttpClient, private actions$: Actions, private router: Router) { }
    loadUsers$ = createEffect(() => this.actions$.pipe(
        ofType(userActions.loadUsers),
        mergeMap(() => this.http.get<User[]>(usersApiUrl).pipe(
            map(users => userActions.loadUsersSuccess({ users })),
            catchError(error => of(userActions.loadUsersFailure({ error })))
        )
        )
    ))

    signInUser$ = createEffect(() => this.actions$.pipe(
        ofType(userActions.signInUser),
        switchMap(({ body }) => this.http.post<UserLogin>(loginApiUrl, body).pipe(
            map(({ user, userId, isLoggedIn }) =>
                userActions.signInUserSuccess({ currentUser: user, isLoggedIn: isLoggedIn, userId: userId })
            ),
            tap(({ userId, isLoggedIn }) => {
                localStorage.setItem("id", userId),
                    localStorage.setItem("isLoggedIn", isLoggedIn)
            }),
            catchError(error => of(userActions.signInUserFailure({ user: null, token: null, error }))),
        )
        )
    ))

    signInUserSuccess$ = createEffect(() => this.actions$.pipe(
        ofType(userActions.signInUserSuccess),
        take(1),
        tap((e) => {
            console.log("SUCCESS LOGIN:",e)
            this.router.navigate(["/tasks-list"])
        })
    ))
}