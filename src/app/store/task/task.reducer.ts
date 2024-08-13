import { createReducer, on, Action } from "@ngrx/store"
import AppState from "../app.state"
import * as taskActions from "./task.actions"
import { Task } from "../../models/task.model"
import { initialState } from "../app.state"




const _taskReducer = createReducer(
    initialState,

    on(taskActions.loadTasksSuccess, (state, { tasks }) => ({ ...state, tasks: [...tasks] })),
    on(taskActions.loadTasksFailure, (state, { error }) => ({ ...state, error })),

    // on(taskActions.loadIndividualTask, (state, { taskId }) => ({ ...state })),
    on(taskActions.loadIndividualTaskSuccess, (state, { task }) => ({ ...state, task: task })),
    on(taskActions.loadIndividualTaskFailure, (state, { error }) => ({ ...state, error })),

    // on(taskActions.createTask, (state, { task }) => ({ ...state })),
    on(taskActions.createTaskSuccess, (state, { createdTask }) => ({ ...state, tasks: [...state.tasks, createdTask] })),

    on(taskActions.updateTask, (state) => ({
        ...state,
        tasks: state.tasks.map(task => task.id === task.id ? task : task
        )
    })),

    on(taskActions.deleteTask, (state, { taskId }) => ({
        ...state,
        tasks: state.tasks.filter(task => task.id !== taskId)
    })))

export function taskReducer(state: AppState | undefined, action: Action) {
    return _taskReducer(state ?? initialState, action)
}