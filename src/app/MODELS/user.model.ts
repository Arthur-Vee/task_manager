export type User = {
    id: string
    username: string
    firstName: string
    lastName: string
}

export type UserLogin = {
    id: string
    token: string
}

export type UserRegistration = {
    username: string
    password: string
    firstName: string
    lastName: string
}