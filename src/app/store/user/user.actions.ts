import { createAction, props } from "@ngrx/store"
import { UpdateUserRoles, User, UserRegistration } from "../../models/user.model"



export const loadUsers = createAction('[User Component] loadUsers')
export const loadUsersSuccess = createAction('[User API] loadUsersSuccess', props<{ users: User[] }>())
export const loadUsersFailure = createAction('[User API] loadUsersFailure', props<{ error: Error }>())

export const registerUser = createAction('[User Component] registerUser', props<{ user: UserRegistration }>())
export const registerUserSuccess = createAction('[User API] registerUserSuccess', props<{ createdUser: User }>())
export const registerUserFailure = createAction('[User API] registerUserFailure', props<{ error: Error }>())

export const signInUser = createAction('[User Component] signInUser', props<{ body: { username: string, password: string } }>())
export const signInUserSuccess = createAction('[User API] signInUserSuccess', props<{ currentUser: User, isLoggedIn: string, userId: string }>())
export const signInUserFailure = createAction('[User API] signInUserFailure', props<{ user: null, token: null, error: Error }>())

export const getCurrentUser = createAction('[User Component] getCurrentUser')
export const getCurrentUserSuccess = createAction('[User API] getCurrentUserSuccess', props<{ currentUser: User, isLoggedIn: string | null }>())
export const getCurrentUserFailure = createAction('[User API] getCurrentUserFailure', props<{ currentUser: null, error: Error }>())

export const signOutUser = createAction('[User Component] signOutUser')
export const signOutUserSuccess = createAction('[User API] signOutUserSuccess')
export const signOutUserFailure = createAction('[User API] signOutUserFailure', props<{ error: Error }>())

export const loadUserRoles = createAction('[User Component] loadUserRoles')
export const loadUserRolesSuccess = createAction('[User API] loadUserRolesSuccess', props<{ userRoles: string[] }>())
export const loadUserRolesFailure = createAction('[User API] loadUserRolesFailure', props<{ error: Error }>())

export const updateUserRole = createAction('[User Component] updateUserRole', props<{ userId: string | null, updateUserRole: UpdateUserRoles }>())
export const updateUserRoleSuccess = createAction('[User API] updateUserRoleSuccess', props<{ updateUserRoles: UpdateUserRoles }>())
export const updateUserRoleFailure = createAction('[User API] updateUserRoleFailure', props<{ error: Error }>())