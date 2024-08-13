import { createAction, props } from "@ngrx/store"
import { User } from "../../models/user.model"



export const loadUsers = createAction('[User Component] loadUsers')
export const loadUsersSuccess = createAction('[User API] loadUsersSuccess', props<{ users: User[] }>())
export const loadUsersFailure = createAction('[User API] loadUsersFailure', props<{ error: Error }>())

export const loadUserById = createAction('[User Component] loadUserById', props<{ userId: string }>())
export const loadUserByIdSuccess = createAction('[User API] loadUserByIdSuccess', props<{ user: User }>())
export const loadUserByIdFailure = createAction('[User API] loadIndividualUserFailure', props<{ error: Error }>())

export const createUser = createAction('[User Component] createUser', props<{ user: User }>())
export const createUserSuccess = createAction('[User API] createUserSuccess', props<{ createdUser: User }>())
export const createUserFailure = createAction('[User API] createUserFailure', props<{ error: Error }>())

export const signInUser = createAction('[User Component] signInUser', props<{ body: { username: string, password: string } }>())
export const signInUserSuccess = createAction('[User API] signInUserSuccess', props<{ currentUser: User, isLoggedIn: string, userId:string }>())
export const signInUserFailure = createAction('[User API] signInUserFailure', props<{ user: null, token: null, error: Error }>())

export const signOutUser = createAction('[User Component] signOutUser')
export const signOutUserSuccess = createAction('[User API] signOutUserSuccess')
export const signOutUserFailure = createAction('[User API] signOutUserFailure', props<{ error: Error }>())

export const loadUserRoles = createAction('[User Component] loadUserRoles')
export const loadUserRolesSuccess = createAction('[User API] loadUserRolesSuccess', props<{ userRoles: string[] }>())
export const loadUserRolesFailure = createAction('[User API] loadUserRolesFailure', props<{ error: Error }>())

export const updateUserRole = createAction('[User Component] updateUserRole', props<{ userId: string, updatedUser: User }>())
export const updateUserRoleSuccess = createAction('[User API] updateUserRoleSuccess', props<{ updatedUser: User }>())
export const updateUserRoleFailure = createAction('[User API] updateUserRoleFailure', props<{ error: Error }>())