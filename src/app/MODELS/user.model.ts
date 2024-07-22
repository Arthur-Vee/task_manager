export type User = {
    id: string,
    username: string,
    firstName: string,
    lastName: string,
}

export type UserLogin = {
    id: string,
    token: string
}
export type LoginForm = {
    username: string,
    password: string
}