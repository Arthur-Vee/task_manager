import { Component } from '@angular/core'
import { FormControl, FormGroup, Validators, FormBuilder, ReactiveFormsModule } from '@angular/forms'
import { Task } from '../../models/task.model'
import { MaterialModule } from '../../material.module'
import { TasksService } from '../../service/tasks/tasks.service'
import { NgIf, NgFor, CommonModule } from '@angular/common'
import { take } from 'rxjs'
import { Router } from '@angular/router'
import { UsersService } from '../../service/users/users.service'
import { TranslateModule } from '@ngx-translate/core'




@Component({
  selector: 'app-create-task',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MaterialModule,
    NgIf,
    NgFor,
    CommonModule,
    TranslateModule
  ],
  templateUrl: './create-task.component.html',
  styleUrl: './create-task.component.scss'
})

export class CreateTaskComponent {
  createTaskForm: FormGroup | null = null
  users$ = this.userService.getAllUsers()

  constructor(private taskService: TasksService, private fb: FormBuilder, private router: Router, private userService: UsersService) {
    this.createTaskForm = this.fb.group({
      title: new FormControl("", Validators.required),
      description: new FormControl("", Validators.required),
      type: new FormControl("", Validators.required),
      assignedTo: new FormControl("UNASSIGNED")
    })
  }

  createTask() {
    if (this.createTaskForm?.valid) {
      const task: Task = this.createTaskForm.value
      this.taskService.createNewTask(task)?.pipe(take(1)).subscribe(() => { this.router.navigate(['/tasks-list']) })
      this.createTaskForm.reset()
    } else {
      console.log("Task creation failed.")
    }
  }

}

