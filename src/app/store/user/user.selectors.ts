import { createSelector, createFeatureSelector } from "@ngrx/store"
import  AppState  from "../app.state"


export const selectUsersState = createFeatureSelector<AppState>('users')
export const selectCurrentUserState = createFeatureSelector<AppState>('currentUser')

export const selectAllUsers = createSelector(
    selectUsersState,
    (state: AppState) => state.users
)
export const selectCurrentUser = createSelector(
    selectCurrentUserState,
    (state: AppState) => state.currentUser
)

