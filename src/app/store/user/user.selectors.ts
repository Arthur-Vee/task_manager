import { createSelector, createFeatureSelector } from '@ngrx/store'
import AppState, { UsersState } from '../app.state'

export const selectUsersState = createFeatureSelector<AppState>('users')

export const selectAllUsers = createSelector(
  selectUsersState,
  (state: AppState) => state.users
)

export const selectCurrentUser = createSelector(
  selectUsersState,
  (state: UsersState) => state.currentUser
)
export const selectIsLoggedIn = createSelector(
  selectUsersState,
  (state: UsersState) => state.isLoggedIn
)

export const selectCurrentUserRoles = createSelector(
  selectUsersState,
  (state: UsersState) => state.currentUser?.roles
)
