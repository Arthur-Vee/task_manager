import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators, FormBuilder } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { Task } from '../../MODELS/task.model';
import { MaterialModule } from '../../material.module';
import { TasksService } from '../../SERVICE/tasks.service';




@Component({
  selector: 'app-create-task',
  standalone: true,
  imports: [ReactiveFormsModule, MaterialModule],
  templateUrl: './create-task.component.html',
  styleUrl: './create-task.component.scss'
})

export class CreateTaskComponent {
  createTaskForm!: FormGroup
  task!: Task
  constructor(private taskService: TasksService, private fb: FormBuilder) {

    this.createTaskForm = this.fb.group({
      title: new FormControl(""),
      description: new FormControl(""),
      type: new FormControl(""),
      createdOn: new FormControl(new Date()),
      status: new FormControl("")
    })
  }


  createTask() {
    if (this.createTaskForm.valid) {
      this.task = this.createTaskForm.value
      this.task.createdOn = new Date()
      this.task.status = "In Progress"
      this.taskService.createNewTask(this.task)
      this.createTaskForm.reset()
      return
    } else {
      console.log('Form is invalid');
    }
  }


}
