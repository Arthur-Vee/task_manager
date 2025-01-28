import { Task } from '../models/task.model'
import { User } from '../models/user.model'

export default interface AppState {
  tasks: Task[],
  currentUser: User | null,
  isLoggedIn: string | null,
  users: User[],
  userId: string | null,
  error: Error | null
}
export interface UsersState {
  users: User[],
  currentUser: User | null,
  isLoggedIn: string | null,
  error: Error | null
}
export interface TaskState {
  tasks: Task[],
  task: Task | null,
  error: Error | null
}
export const initialState: AppState = {
  tasks: [],
  currentUser: null,
  isLoggedIn: null,
  users: [],
  userId: null,
  error: null
}
