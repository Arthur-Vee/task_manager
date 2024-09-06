import { createReducer, on, Action } from '@ngrx/store'
import { UsersState } from '../app.state'
import * as userActions from './user.actions'

var initialState: UsersState = {
  users: [],
  currentUser: null,
  isLoggedIn: null,
  error: null,
}

const _userReducer = createReducer(
  initialState,
  on(userActions.loadUsersSuccess, (state, { users }) => ({
    ...state,
    users: users,
  })),
  on(userActions.loadUsersFailure, (state, { error }) => ({
    ...state,
    users: [],
    error,
  })),

  on(userActions.signInUser, (state) => ({ ...state })),
  on(
    userActions.signInUserSuccess,
    (state, { currentUser, isLoggedIn, userId }) => ({
      ...state,
      currentUser,
      isLoggedIn,
      userId,
      error: null,
    })
  ),
  on(userActions.signInUserFailure, (state, { error }) => ({
    ...state,
    currentUser: null,
    isLoggedIn: null,
    error,
  })),

  on(userActions.getCurrentUser, (state) => ({
    ...state,
  })),
  on(
    userActions.getCurrentUserSuccess,
    (state, { currentUser, isLoggedIn }) => ({
      ...state,
      currentUser,
      isLoggedIn: isLoggedIn,
    })
  ),
  on(userActions.getCurrentUserFailure, (state, { error }) => ({
    ...state,
    currentUser: null,
    error,
  })),

  on(userActions.updateUserRole, (state) => ({
    ...state,
    users: state.users.map((user) => (user.id === user.id ? user : user)),
  })),
  on(userActions.updateUserRoleSuccess, (state, { updateUserRoles }) => ({
    ...state,
    users: state.users.map((user) =>
      user.id === updateUserRoles.updatedUserId
        ? { ...user, roles: updateUserRoles.updatedUserRoles || [] }
        : user
    ),
  })),
  on(userActions.updateUserRoleFailure, (state, error) => ({
    ...state,
    Error: error,
  })),

  on(userActions.signOutUser, (state) => ({
    ...state,
    currentUser: null,
    isLoggedIn: null,
    userId: null,
  })),
  on(userActions.signOutUserFailure, (state, { error }) => ({
    ...state,
    error,
  }))
)

export function userReducer(
  state: UsersState | undefined = initialState,
  action: Action
): UsersState {
  return _userReducer(state, action)
}
