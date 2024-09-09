import { createAction, props } from "@ngrx/store"
import { Task } from "../../models/task.model"

export const loadTasks = createAction('[Task Component] loadTasks')
export const loadTasksSuccess = createAction('[Task API] loadTasksSuccess', props<{ tasks: Task[] }>())
export const loadTasksFailure = createAction('[Task API] loadTasksFailure', props<{ error: any }>())

export const loadIndividualTask = createAction('[Task Component] loadIndividualTask', props<{ taskId: string }>())
export const loadIndividualTaskSuccess = createAction('[Task API] loadIndividualTaskSuccess', props<{ task: Task }>())
export const loadIndividualTaskFailure = createAction('[Task API] loadIndividualTaskFailure', props<{ error: any }>())


export const createTask = createAction('[Task Component] createTask', props<{ task: Task }>())
export const createTaskSuccess = createAction('[Task API] createTaskSuccess', props<{ createdTask: Task }>())
export const createTaskFailure = createAction('[Task API] createTaskFailure', props<{ error: any }>())

export const deleteTask = createAction('[Task Component] deleteTask', props<{ taskId: string }>())
export const deleteTaskSuccess = createAction('[Task API] deleteTaskSuccess', props<{ taskId: string }>())
export const deleteTaskFailure = createAction('[Task API] deleteTaskFailure', props<{ error: any }>())

export const updateTask = createAction('[Task Component] updateTask', props<{ updatedTaskDetails: Task }>())
export const updateTaskSuccess = createAction('[Task API] updateTaskSuccess', props<{ updatedTask: Task }>())
export const updateTaskFailure = createAction('[Task API] updateTaskFailure', props<{ error: any }>())
