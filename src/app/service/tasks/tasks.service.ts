import { Inject, Injectable } from '@angular/core'
import { Task } from '../../models/task.model'
import { Observable } from 'rxjs'
import { HttpClient } from '@angular/common/http'
import { tasksApiUrl } from '../../utils/constants'
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
    var body = {
      userId: this.localStorage?.getItem('id'),
    }
    return this.http.post<Task[]>(tasksApiUrl,body)
  }

  getTaskById(taskId: string): Observable<Task> {
    return this.http.get<Task>(tasksApiUrl + taskId)
  }

  createNewTask(task: Task): Observable<Task> {
    return this.http.post<Task>(tasksApiUrl+"create", task)
  }

  deleteTask(taskId: string): Observable<Task[]> {
    return this.http.delete<Task[]>(tasksApiUrl + taskId)
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
