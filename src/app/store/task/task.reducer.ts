import { createReducer, on, Action } from '@ngrx/store'
import { TaskState } from '../app.state'
import * as taskActions from './task.actions'

var initialState: TaskState = {
  tasks: [],
  task: null,
  error: null,
}

const _taskReducer = createReducer(
  initialState,

  on(taskActions.loadTasksSuccess, (state, { tasks }) => ({
    ...state,
    tasks: [...tasks],
  })),
  on(taskActions.loadTasksFailure, (state, { error }) => ({ ...state, error })),

  on(taskActions.loadIndividualTaskSuccess, (state, { task }) => ({
    ...state,
    task: task,
  })),
  on(taskActions.loadIndividualTaskFailure, (state, { error }) => ({
    ...state,
    error,
  })),

  on(taskActions.createTaskSuccess, (state, { createdTask }) => ({
    ...state,
    tasks: [...state.tasks, createdTask],
  })),
  on(taskActions.createTaskFailure, (state, { error }) => ({
    ...state,
    error,
  })),

  on(taskActions.updateTask, (state) => ({
    ...state,
    tasks: state.tasks.map((task) => (task.id === task.id ? task : task)),
  })),

  on(taskActions.deleteTask, (state, { taskId }) => ({
    ...state,
    tasks: state.tasks.filter((task) => task.id !== taskId),
  }))
)

export function taskReducer(
  state: TaskState | undefined = initialState,
  action: Action
) {
  return _taskReducer(state, action)
}
