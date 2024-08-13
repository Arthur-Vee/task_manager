import { createReducer, on, Action } from "@ngrx/store"
import AppState from "../app.state"
import * as userActions from './user.actions'
import { User } from "../../models/user.model"
import { initialState } from "../app.state"

const _userReducer = createReducer(
    initialState,
    on(userActions.loadUsersSuccess, (state, { users }) => ({ ...state, users: users })),
    on(userActions.loadUsersFailure, (state, { error }) => ({ ...state, users: [], error })),

    on(userActions.signInUser, (state) => ({ ...state })),
    // on(userActions.signInUserSuccess, (state, { currentUser, isLoggedIn, userId }) =>
    //      ({ ...state, currentUser: currentUser, isLoggedIn: isLoggedIn, userId: userId, error: null })),

    on(userActions.signInUserSuccess, (state, { currentUser, isLoggedIn, userId }) => {
        console.log("Updating state with user:", currentUser)
        return {
          ...state,
          currentUser,
          isLoggedIn,
          userId,
          error: null,
        };
      }),
    on(userActions.signInUserFailure, (state, { error }) => ({ ...state, currentUser: null, isLoggedIn: null, error })),


)

export function userReducer(state: AppState | undefined, action: Action): AppState {
    return _userReducer(state ?? initialState, action)
}