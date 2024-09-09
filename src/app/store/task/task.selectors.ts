import { createFeatureSelector, createSelector } from "@ngrx/store"
import { TaskState } from "../app.state"

export const selectTaskState = createFeatureSelector<TaskState>('tasks')

export const selectAllTasks = createSelector(
    selectTaskState,
    (state: TaskState) => state.tasks
)
export const selectTaskById = createSelector(
    selectTaskState,
    (state: TaskState) => state.task
)