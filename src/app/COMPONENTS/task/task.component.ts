import { Component } from '@angular/core';
import { CreateTaskComponent } from '../create-task/create-task.component';
import { Task } from '../../models/task.model';
import { TasksService } from '../../service/tasks.service';
import { NgFor, NgIf, CommonModule } from '@angular/common';
import { MaterialModule } from '../../material.module';
import { take } from 'rxjs';






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

  availableTasks$ = this.taskService.getAllTasks().pipe(take(1))

  constructor(private taskService: TasksService) { }

  deleteTask(taskId: string) {
    this.availableTasks$ = this.taskService.deleteTask(taskId).pipe(take(1))
  }
  taskDetails(taskId: string) {
    this.taskService.taskDetails(taskId)
  }
  updateTask(task: Task) {
    this.taskService.updateTask(task)
  }

}
