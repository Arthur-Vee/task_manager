import { Component } from '@angular/core'
import { FormControl, FormGroup, Validators, FormBuilder,ReactiveFormsModule } from '@angular/forms'
import { Task } from '../../models/task.model'
import { MaterialModule } from '../../material.module'
import { TasksService } from '../../service/tasks/tasks.service'
import { NgIf } from '@angular/common'
import { take } from 'rxjs'
import { Router } from '@angular/router'




@Component({
  selector: 'app-create-task',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MaterialModule,
    NgIf,
  ],
  templateUrl: './create-task.component.html',
  styleUrl: './create-task.component.scss'
})

export class CreateTaskComponent {
  createTaskForm: FormGroup | null = null

  constructor(private taskService: TasksService, private fb: FormBuilder, private router: Router) {

    this.createTaskForm = this.fb.group({
      title: new FormControl("", Validators.required),
      description: new FormControl("", Validators.required),
      type: new FormControl("", Validators.required),
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

