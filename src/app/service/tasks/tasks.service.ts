import { Inject, Injectable } from '@angular/core'
import { Task } from '../../models/task.model'
import { Observable } from 'rxjs'
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { createTaskApiUrl, tasksApiUrl } from '../../utils/constants'
import { DOCUMENT } from '@angular/common'


@Injectable({
  providedIn: 'root'
})
export class TasksService {
  localStorage: Storage | undefined

  constructor(private http: HttpClient, @Inject(DOCUMENT) private document: Document) { 
    this.localStorage = document.defaultView?.localStorage
  }

  getAllTasks(): Observable<Task[]> {
    let userId = this.localStorage?.getItem('id')
    return this.http.post<Task[]>(tasksApiUrl,{userId})
  }

  getTaskById(taskId: string): Observable<Task> {
    let headers = new HttpHeaders().set("Authorization", `Bearer ${this.localStorage?.getItem('id')}`)
    return this.http.get<Task>(tasksApiUrl + taskId)
  }

  createNewTask(task: Task): Observable<Task> {
    let userId = this.localStorage?.getItem('id')
    return this.http.post<Task>(createTaskApiUrl, {task,userId})
  }

  deleteTask(taskId: string): Observable<Task[]> {
    let body = {
      userId: this.localStorage?.getItem('id')
    }
    return this.http.delete<Task[]>(tasksApiUrl + taskId,{body})
  }

  updateTask(taskWithNewData: Task): Observable<Task> {
    const body = {
      id: taskWithNewData.id,
      userId: this.localStorage?.getItem('id'),
      description: taskWithNewData.description,
      title: taskWithNewData.title,
      status: taskWithNewData.status,
      type: taskWithNewData.type,
      assignedTo: taskWithNewData.assignedTo
    }
    return this.http.patch<Task>(tasksApiUrl, body)
  }

}
