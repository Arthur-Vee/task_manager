import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators, FormBuilder } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { Task } from '../../MODELS/task.model';
import { MaterialModule } from '../../material.module';
import { TasksService } from '../../SERVICE/tasks.service';
import { NgIf } from '@angular/common';




@Component({
  selector: 'app-create-task',
  standalone: true,
  imports: [ReactiveFormsModule, MaterialModule, NgIf],
  templateUrl: './create-task.component.html',
  styleUrl: './create-task.component.scss'
})

export class CreateTaskComponent {
  createTaskForm: FormGroup | null = null

  constructor(private taskService: TasksService, private fb: FormBuilder) {

    this.createTaskForm = this.fb.group({
      title: new FormControl(""),
      description: new FormControl(""),
      type: new FormControl(""),
    })
  }


  createTask() {
    if (this.createTaskForm?.valid) {
      const task: Task = this.createTaskForm.value

      task.createdOn = new Date()
      task.status = "In Progress"

      this.taskService.createNewTask(task)
      this.createTaskForm.reset()

    } else {
      console.log('Form is invalid');
    }
  }


}
