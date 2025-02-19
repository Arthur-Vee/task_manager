export type User = {
  id: string
  username: string
  firstName: string
  lastName: string
  roles: string[]
}

export type UserLogin = {
  id: string
  token: string
  user: User
}

export type UserRegistration = {
  username: string
  password: string
  firstName: string
  lastName: string
}

export type LoginForm = {
  username: string
  password: string
}
export type UpdateUserRoles = {
  updatedUserId: string | null
  updatedUserRoles: string[] | null
}

export type UserGroup = {
  groupId: string | null
  groupName: string | null
  groupDescription: string | null
  groupMembers: string[] | null
}
