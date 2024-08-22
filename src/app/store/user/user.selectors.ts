import { createSelector, createFeatureSelector } from "@ngrx/store"
import AppState, { UsersState } from "../app.state"


export const selectUsersState = createFeatureSelector<AppState>('users')
export const selectCurrentUserState = createFeatureSelector<UsersState>('currentUser')
export const selectCurrentUserIsLoggedInState = createFeatureSelector<UsersState>('isLoggedIn')


export const selectAllUsers = createSelector(
    selectUsersState,
    (state: AppState) => state.users
)

export const selectCurrentUser = createSelector(
    selectCurrentUserState,
    (state: UsersState) => state.currentUser
)
export const selectIsLoggedIn = createSelector(
    selectCurrentUserIsLoggedInState,
    (state: UsersState) => state.isLoggedIn
)

export const selectCurrentUserRoles = createSelector(
    selectCurrentUserState,
    (state: UsersState) => state.currentUser?.roles
)

