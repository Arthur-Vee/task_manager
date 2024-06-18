import { Injectable } from '@angular/core';
import { Task } from '../MODELS/task.model';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TasksService {

  constructor() {

  }
  private tasks = new BehaviorSubject<Task[]>([
    {
      title: "Grocery Shopping",
      description: "Buy milk, bread, eggs, and fruits",
      type: "Personal",
      createdOn: new Date(),
      status: "To Do",
    },
    {
      title: "Finish Work Report",
      description: "Complete the Q2 sales report for the manager",
      type: "Work",
      createdOn: new Date(2024, 6, 15),
      status: "In Progress",
    },
    {
      title: "Pay Bills",
      description: "Pay electricity and internet bills",
      type: "Personal",
      createdOn: new Date(2024, 6, 12),
      status: "In Progress",
    },
  ])

  availableTasks$ = this.tasks.asObservable()


  createNewTask(task: Task) {

    if (task) {
      const createdTask = this.tasks.getValue().slice()
      createdTask.push(task)
      this.tasks.next(createdTask)

    } else {
      console.log("no Tasks were Created")
    }
  }
  deleteTask(deletedTask: Task) {
    const updatedTasksArray = this.tasks.getValue().filter((task) => task !== deletedTask);
    this.tasks.next(updatedTasksArray)
  }
}
