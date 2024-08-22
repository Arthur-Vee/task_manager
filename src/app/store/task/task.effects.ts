import { Injectable } from "@angular/core"
import { of, switchMap, tap } from "rxjs"
import { catchError, map } from "rxjs"
import { createEffect, Actions, ofType } from "@ngrx/effects"
import * as taskActions from "./task.actions"
import { Task } from "../../models/task.model"
import { Router } from "@angular/router"
import { TasksService } from "../../service/tasks/tasks.service"

@Injectable()
export class TaskEffects {
    constructor(private tasksService: TasksService, private actions$: Actions, private router: Router) { }

    loadTasks$ = createEffect(() => this.actions$.pipe(
        ofType(taskActions.loadTasks),
        switchMap(() => this.tasksService.getAllTasks().pipe(
            map(tasks => taskActions.loadTasksSuccess({ tasks })),
            catchError(error => of(taskActions.loadTasksFailure({ error })))
        ))))

    deleteTask$ = createEffect(() => this.actions$.pipe(
        ofType(taskActions.deleteTask),
        switchMap(({ taskId }) => this.tasksService.deleteTask(taskId).pipe(
            map(() => taskActions.deleteTaskSuccess({ taskId })),
            catchError(error => of(taskActions.deleteTaskFailure({ error })))
        ))))

    createTask$ = createEffect(() => this.actions$.pipe(
        ofType(taskActions.createTask),
        switchMap(({ task }) => this.tasksService.createNewTask(task).pipe(
            map((createdTask: Task) => taskActions.createTaskSuccess({ createdTask })),
            tap(() => {
                this.router.navigate(['/tasks-list'])
            }),
            catchError(error => of(taskActions.createTaskFailure({ error })))
        ))))

    updateTask$ = createEffect(() => this.actions$.pipe(
        ofType(taskActions.updateTask),
        switchMap(({ updatedTaskDetails }) => this.tasksService.updateTask(updatedTaskDetails).pipe(
            map((updatedTask: Task) => taskActions.updateTaskSuccess({ updatedTask })),
            catchError(error => of(taskActions.updateTaskFailure({ error })))
        ))))

    loadTaskById$ = createEffect(() => this.actions$.pipe(
        ofType(taskActions.loadIndividualTask),
        switchMap(({ taskId }) => this.tasksService.getTaskById(taskId).pipe(
            map((task: Task) => taskActions.loadIndividualTaskSuccess({ task })),
            catchError(error => of(taskActions.loadIndividualTaskFailure({ error })))
        ))
    ))
}