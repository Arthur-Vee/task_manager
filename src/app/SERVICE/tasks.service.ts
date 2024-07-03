import { Injectable } from '@angular/core';
import { Task } from '../models/task.model';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { tasksApiUrl } from '../utils/constants';


@Injectable({
  providedIn: 'root'
})
export class TasksService {

  constructor(private http: HttpClient) { }

  getAllTasks(): Observable<Task[]> {
    return this.http.get<Task[]>(tasksApiUrl)
  }

  createNewTask(task: Task) {
      return this.http.post<Task[]>(tasksApiUrl, task)
  }
  deleteTask(taskId: string) {
    return this.http.delete<Task[]>(tasksApiUrl + taskId)
  }
  taskDetails(tasksId: string) {
    console.log(tasksId)
  }
  updateTask(taskNewData: Task) {
    const body = {
      id: taskNewData.id,
      description: taskNewData.description,
      title: taskNewData.title,
      status: taskNewData.status
    }
    return this.http.patch<string>(tasksApiUrl, body)

  }

}
