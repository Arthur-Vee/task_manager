import { Component } from '@angular/core'
import { Task } from '../../models/task.model'
import { TasksService } from '../../service/tasks/tasks.service'
import { NgFor, NgIf, CommonModule } from '@angular/common'
import { MaterialModule } from '../../material.module'
import { Router } from '@angular/router'
import { UsersService } from '../../service/users/users.service'

@Component({
  selector: 'app-task',
  standalone: true,
  imports: [
    NgFor,
    NgIf,
    CommonModule,
    MaterialModule,
  ],
  templateUrl: './task.component.html',
  styleUrl: './task.component.scss'
})

export class TaskComponent {
  availableTasks$ = this.taskService.getAllTasks()

  constructor(private taskService: TasksService, private router: Router,private usersService:UsersService) { }

  deleteTask(taskId: string) {
    this.availableTasks$ = this.taskService.deleteTask(taskId)
  }

  sendToTaskDetails(task: Task) {
    this.router.navigate(['/task-details', task.id])
  }
}
