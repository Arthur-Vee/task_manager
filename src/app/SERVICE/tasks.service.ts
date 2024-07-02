import { Injectable } from '@angular/core';
import { Task } from '../models/task.model';
import { Observable, map, switchMap } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { tasksApiUrl } from '../utils/constants';

@Injectable({
  providedIn: 'root'
})
export class TasksService {

  constructor(private http: HttpClient, private router: Router) {
  }

  getAllTasks(): Observable<Task[]> {
    return this.http.get<Task[]>(tasksApiUrl)
      .pipe(
        map(data => data)
      );
  }

  createNewTask(task: Task) {
    if (task) {
      this.http.post(tasksApiUrl, task).subscribe()
    } else {
      return
    }
  }
  deleteTask(taskId: string){
    return this.http.delete<Task>(tasksApiUrl + taskId)
    .pipe(
      switchMap(() => this.getAllTasks()),
    );
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
    this.http.patch<string>(tasksApiUrl, body)

  }

}
