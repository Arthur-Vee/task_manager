import { Injectable } from "@angular/core"

import { of, tap } from "rxjs"
import { catchError, map, mergeMap, concatMap } from "rxjs"

import { createEffect, Actions, ofType } from "@ngrx/effects"
import * as taskActions from "./task.actions"
import { Task } from "../../models/task.model"
import { Router } from "@angular/router"
import { HttpClient } from '@angular/common/http'

import { tasksApiUrl } from '../../utils/constants'

@Injectable()
export class TaskEffects {
    constructor(private actions$: Actions, private router: Router, private http: HttpClient) { }

    loadTasks$ = createEffect(() => this.actions$.pipe(
        ofType(taskActions.loadTasks),
        mergeMap(() => this.http.get<Task[]>(tasksApiUrl).pipe(
            map(tasks => taskActions.loadTasksSuccess({ tasks })),
            catchError(error => of(taskActions.loadTasksFailure({ error })))
        ))))

    deleteTask$ = createEffect(() => this.actions$.pipe(
        ofType(taskActions.deleteTask),
        mergeMap(({ taskId }) => this.http.delete<Task[]>(tasksApiUrl + taskId).pipe(
            map(() => taskActions.deleteTaskSuccess({ taskId })),
            tap(() => console.log('Task deleted', taskId)),
            catchError(error => of(taskActions.deleteTaskFailure({ error })))
        ))))

    createTask$ = createEffect(() => this.actions$.pipe(
        ofType(taskActions.createTask),
        concatMap(({ task }) => this.http.post<Task>(tasksApiUrl, task).pipe(
            map((createdTask: Task) => taskActions.createTaskSuccess({ createdTask })),
            tap(() => {
                    this.router.navigate(['/tasks-list'])
            }),
            catchError(error => of(taskActions.createTaskFailure({ error })))
        ))))

    updateTask$ = createEffect(() => this.actions$.pipe(
        ofType(taskActions.updateTask),
        concatMap(({ updatedTaskDetails }) => this.http.patch<Task>(tasksApiUrl, updatedTaskDetails).pipe(
            map((updatedTask: Task) => taskActions.updateTaskSuccess({ updatedTask })),
            tap(() => {
            }),
            catchError(error => of(taskActions.updateTaskFailure({ error })))
        ))))

    loadTaskById$ = createEffect(() => this.actions$.pipe(
        ofType(taskActions.loadIndividualTask),
        concatMap(({ taskId }) => this.http.get<Task>(tasksApiUrl + taskId).pipe(
            map((task: Task) => taskActions.loadIndividualTaskSuccess({ task })),
            catchError(error => of(taskActions.loadIndividualTaskFailure({ error })))
        ))
    ))
}