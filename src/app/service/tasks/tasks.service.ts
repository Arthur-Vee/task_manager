import { Inject, Injectable } from '@angular/core'
import { Task } from '../../models/task.model'
import { catchError, filter, Observable, shareReplay, switchMap, throwError } from 'rxjs'
import { HttpClient } from '@angular/common/http'
import { createTaskApiUrl, tasksApiUrl } from '../../utils/constants'
import { DOCUMENT } from '@angular/common'
import { Store } from '@ngrx/store'
import { selectCurrentUserId } from '../../store/user/user.selectors'


@Injectable({
  providedIn: 'root'
})
export class TasksService {
  localStorage: Storage | undefined
  
  userId$ = this.store.select(selectCurrentUserId).pipe(
    filter((userId): userId is string => userId !== undefined && userId !== null),
    shareReplay(1)
  )

  constructor(private http: HttpClient, @Inject(DOCUMENT) private document: Document, private store: Store,) { 
    this.localStorage = document.defaultView?.localStorage
  }
  getUserId<T>(callback: (userId: string) => Observable<T>): Observable<T> {
    return this.userId$.pipe(
      switchMap(callback),
      catchError((error) => {
        console.error('Error during API call:', error);
        return throwError(() => error);
      })
    );
  }
  getAllTasks(): Observable<Task[]> {
    return this.getUserId((userId)=> {
        return this.http.post<Task[]>(tasksApiUrl, { userId }
        )
      }
    )
  }

  getTaskById(taskId: string): Observable<Task> {
    return this.http.get<Task>(tasksApiUrl + taskId)
  }

  createNewTask(task: Task): Observable<Task> {
    return this.getUserId(
        (userId)=>{
        return this.http.post<Task>(createTaskApiUrl, {task,userId})}
    )
  }
  deleteTask(taskId: string): Observable<Task[]> {
    return this.getUserId((userId)=> {
      const body = {
        userId: userId
      }
      return this.http.delete<Task[]>(tasksApiUrl + taskId,{body})
    }
  )
  }

  updateTask(taskWithNewData: Task): Observable<Task> {
    return this.getUserId((userId) => {
        const body = {
          id: taskWithNewData.id,
          userId: userId,
          description: taskWithNewData.description,
          title: taskWithNewData.title,
          status: taskWithNewData.status,
          type: taskWithNewData.type,
          assignedTo: taskWithNewData.assignedTo
        }
        return this.http.patch<Task>(tasksApiUrl, body)
      })
  }
}
