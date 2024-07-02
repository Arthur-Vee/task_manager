import { Component } from '@angular/core';
import { CreateTaskComponent } from '../create-task/create-task.component';
import { Task } from '../../models/task.model';
import { TasksService } from '../../service/tasks.service';
import { NgFor, NgIf, CommonModule } from '@angular/common';
import { MaterialModule } from '../../material.module';
import { BehaviorSubject, Observable } from 'rxjs';






@Component({
  selector: 'app-task',
  standalone: true,
  imports: [
    CreateTaskComponent,
    NgFor,
    NgIf,
    CommonModule,
    MaterialModule
  ],
  templateUrl: './task.component.html',
  styleUrl: './task.component.scss'
})


export class TaskComponent {
  availableTasks$ = new BehaviorSubject<Task[]>([])

  constructor(private taskService: TasksService) {
  }
  ngOnInit() {
    this.taskService.getAllTasks().subscribe(data => {
      this.availableTasks$.next(data)

    })
  }

  deleteTask(taskId: string) {
    this.taskService.deleteTask(taskId)
    const updatedTasksArray = this.availableTasks$.getValue().filter((task) => task.id !== taskId);
    this.availableTasks$.next(updatedTasksArray)

  }
  taskDetails(taskId: string) {
    this.taskService.taskDetails(taskId)
  }
  updateTask(task: Task) {
    this.taskService.updateTask(task)
  }

}
