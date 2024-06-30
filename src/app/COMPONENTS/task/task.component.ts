import { Component } from '@angular/core';
import { CreateTaskComponent } from '../create-task/create-task.component';
import { Task } from '../../models/task.model';
import { TasksService } from '../../service/tasks.service';
import { NgFor, NgIf, CommonModule } from '@angular/common';
import { MaterialModule } from '../../material.module';






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
  tasks$ = this.taskService.availableTasks$;

  constructor(private taskService: TasksService) { }


  deleteTask(taskId:string) {
    this.taskService.deleteTask(taskId)
  }
  taskDetails(id: string) {
    this.taskService.taskDetails(id)
  }
  updateTask(task:Task){
    this.taskService.updateTask(task)
  }

}
