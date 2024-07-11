import { Injectable } from '@angular/core'
import { Task } from '../../models/task.model'
import { BehaviorSubject, Observable } from 'rxjs'
import { HttpClient } from '@angular/common/http'
import { tasksApiUrl } from '../../utils/constants'


@Injectable({
  providedIn: 'root'
})
export class TasksService {

  taskSubject: BehaviorSubject<Task | null> = new BehaviorSubject<Task | null>(null)
  task$: Observable<Task | null> = this.taskSubject.asObservable()

  constructor(private http: HttpClient) { }

  getAllTasks(): Observable<Task[]> {
    return this.http.get<Task[]>(tasksApiUrl)
  }

  getTaskById(taskId: string): Observable<Task> {
    return this.http.get<Task>(tasksApiUrl + taskId)
  }

  createNewTask(task: Task) {
    return this.http.post<Task[]>(tasksApiUrl, task)
  }

  deleteTask(taskId: string) {
    return this.http.delete<Task[]>(tasksApiUrl + taskId)
  }

  updateTask(taskWithNewData: Task, taskId: string) {
    const body = {
      id: taskId,
      description: taskWithNewData.description,
      title: taskWithNewData.title,
      status: taskWithNewData.status,
      type: taskWithNewData.type,
      assignedTo: taskWithNewData.assignedTo
    }
    return this.http.patch<Task>(tasksApiUrl, body)
  }

}
