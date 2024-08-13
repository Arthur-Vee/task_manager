import { Task } from "../models/task.model";
import { User } from "../models/user.model";

export default interface AppState {
    tasks: Task[],
    currentUser: User | null,
    users: User[],
    isLoggedIn: string | null,
    userId: string | null
}
export interface UsersState {
    users: User[],
    currentUser: User | null,
    currentUserToken: string | null,
    error: Error | null
}
export interface TaskState {
    tasks: Task[];
    task: Task
    error: Error | null
}
export const initialState: AppState = {
    tasks: [],
    currentUser: null,
    users: [],
    isLoggedIn: null,
    userId: null
}
