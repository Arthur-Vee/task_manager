import { Injectable } from '@angular/core';
import { Task } from '../models/task.model';
import { BehaviorSubject, Observable, map } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Constants } from '../utils/constants';

@Injectable({
  providedIn: 'root'
})
export class TasksService {

  constructor(private http: HttpClient, private router: Router, private constants: Constants) {
  }

  public getAllTasks():Observable<Task[]>{
    return this.http.get<Task[]>(this.constants.tasksApiUrl)
      .pipe(
        map(data => { return data })
      );
  }

  async createNewTask(task: Task) {
    if (task) {
      await this.http.post(this.constants.tasksApiUrl, task).subscribe()
    } else {
      return
    }
  }
  async deleteTask(deleteTaskId: string) {

    this.http.delete<string>(this.constants.tasksApiUrl + deleteTaskId).subscribe(() => {
    })
  }
  async taskDetails(tasksId: string) {
   console.log(tasksId)
  }
  async updateTask(tasksNewData: Task) {
    const body = {
      id: tasksNewData.id,
      description: tasksNewData.description,
      title: tasksNewData.title,
      status: tasksNewData.status
    }
    await this.http.patch<string>(this.constants.tasksApiUrl, body).subscribe()
  }

}
