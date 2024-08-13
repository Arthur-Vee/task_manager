
export type User = {
    id: string
    username: string
    firstName: string
    lastName: string
    roles: string[]
}

export type UserLogin = {
    userId: string
    isLoggedIn: string
    user: User
}

export type UserRegistration = {
    username: string
    password: string
    firstName: string
    lastName: string
}

export type LoginForm = {
    username: string,
    password: string
}
export type UpdateUserRoles = {
    updatedUserId: string | null,
    updatedUserRoles: string[] | null
}
