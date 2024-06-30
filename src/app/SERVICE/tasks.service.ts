import { Injectable } from '@angular/core';
import { Task } from '../models/task.model';
import { BehaviorSubject, map } from 'rxjs';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Router } from '@angular/router';
import { response } from 'express';

@Injectable({
  providedIn: 'root'
})
export class TasksService {
  updatedTaskList: any;

  // readonly ROOT_URL = "localhost:3000" // ATM proxy handles this root
  tasksApiUrl: string = "http://localhost:3000/tasks/"

  constructor(private http: HttpClient, private router: Router) {
  }
  private tasks = new BehaviorSubject<Task[]>([])

  availableTasks$ = this.tasks.asObservable()

  async getAllTasks() {
    await this.http.get<Task[]>(this.tasksApiUrl).pipe(map(data => {
      this.tasks.next([...data])
    })).subscribe()
  }

  async createNewTask(task: Task) {
    if (task) {
      const httpOptions = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json'
        }),
        responseType: 'text' as 'json'
      };
      await this.http.post(this.tasksApiUrl, task, httpOptions).subscribe()
    } else {
      return
    }
  }
  async deleteTask(deleteTaskId: string) {
    const updatedTasksArray = this.tasks.getValue().filter((task) => task.id !== deleteTaskId);
    this.tasks.next(updatedTasksArray)
    const url = deleteTaskId;
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      }),
      responseType: 'text' as 'json'
    };
    this.http.delete<string>(this.tasksApiUrl + url, httpOptions).subscribe(() => {
    })
  }
  async taskDetails(id: string) {
    const taskDetails = this.tasks.getValue().slice().filter((task) => task.id == id);
  }
 async updateTask(tasksNewData: Task) {
    const body = {
      id:tasksNewData.id,
      description:tasksNewData.description,
      title:tasksNewData.title,
      status:tasksNewData.status
    }
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      },),
    };

   await this.http.patch<string>(this.tasksApiUrl, body, httpOptions).subscribe((response) => {
      console.log("Updated task with ID: "+response)

    })
  }

}
