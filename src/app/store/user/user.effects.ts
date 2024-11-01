import { Injectable } from '@angular/core'
import { Router } from '@angular/router'
import { of, tap } from 'rxjs'
import { catchError, map, mergeMap, switchMap } from 'rxjs'
import { createEffect, Actions, ofType } from '@ngrx/effects'
import * as userActions from './user.actions'
import { UsersService } from '../../service/users/users.service'

@Injectable()
export class UserEffects {
  constructor(
    private actions$: Actions,
    private router: Router,
    private service: UsersService
  ) {}
  loadUsers$ = createEffect(() =>
    this.actions$.pipe(
      ofType(userActions.loadUsers),
      mergeMap(() =>
        this.service.getAllUsers().pipe(
          map((users) => userActions.loadUsersSuccess({ users })),
          catchError((error) => of(userActions.loadUsersFailure({ error })))
        )
      )
    )
  )

  signInUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(userActions.signInUser),
      switchMap(({ body }) =>
        this.service.signInUser(body).pipe(
          map((response) =>
            userActions.signInUserSuccess({
              currentUser: response.user,
              isLoggedIn: response.token,
              userId: response.id,
            })
          ),
          tap(({ userId, isLoggedIn }) => {
            localStorage.setItem('id', userId)
            localStorage.setItem('isLoggedIn', isLoggedIn)
            this.router.navigate(['/tasks-list'])
          }),
          catchError((error) => of(userActions.signInUserFailure(error)))
        )
      )
    )
  )

  getCurrentUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(userActions.getCurrentUser),
      switchMap(() =>
        this.service.getUser().pipe(
          map((user) =>
            userActions.getCurrentUserSuccess({
              currentUser: user,
              isLoggedIn: localStorage.getItem('isLoggedIn'),
            })
          ),
          catchError((error) =>
            of(
              userActions.getCurrentUserFailure({
                currentUser: null,
                error: error,
              })
            )
          )
        )
      )
    )
  )

  updateUserRole$ = createEffect(() =>
    this.actions$.pipe(
      ofType(userActions.updateUserRole),
      tap(({ updateUserRole }) => {
        this.service.updateUserRole(updateUserRole)
      }),
      map(({ updateUserRole }) =>
        userActions.updateUserRoleSuccess({ updateUserRoles: updateUserRole })
      ),
      catchError((error) => of(userActions.updateUserRoleFailure({ error })))
    )
  )

  registerUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(userActions.registerUser),
      switchMap(({ user }) =>
        this.service.registerUser(user).pipe(
          tap((response) => {
            localStorage.setItem('id', response.id)
            localStorage.setItem('isLoggedIn', response.token)
            this.router.navigate(['/tasks-list'])
          }),
          map((createdUser) =>
            userActions.signInUserSuccess({
              currentUser: createdUser.user,
              isLoggedIn: createdUser.token,
              userId: createdUser.id,
            })
          ),
          catchError((error) => {
            return of(userActions.registerUserFailure({ error }))
          })
        )
      )
    )
  )
  signOutUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(userActions.signOutUser),
      tap(() => {
        localStorage.removeItem('id')
        localStorage.removeItem('isLoggedIn')
        this.router.navigate(['/login'])
      }),
      map(() => userActions.signOutUserSuccess())
    )
  )
}
