import { Component, OnInit } from '@angular/core'
import { Task } from '../../models/task.model'
import { MaterialModule } from '../../material.module'
import { TasksService } from '../../service/tasks.service'
import { ActivatedRoute } from '@angular/router'
import { Observable, map, switchMap, take } from 'rxjs'
import { CommonModule, NgIf } from '@angular/common'
import { FormBuilder, FormControl, Validators, ReactiveFormsModule, FormGroup } from '@angular/forms'

@Component({
  selector: 'app-task-details',
  standalone: true,
  imports: [
    MaterialModule,
    CommonModule,
    NgIf,
    ReactiveFormsModule
  ],
  templateUrl: './task-details.component.html',
  styleUrl: './task-details.component.scss'
})
export class TaskDetailsComponent implements OnInit {

  task$: Observable<Task> | null = null

  editing: boolean = false;

  taskForm: FormGroup = this.fb.group({
    title: new FormControl({ value: "", disabled: true }, Validators.required),
    description: new FormControl({ value: "", disabled: true }, Validators.required),
    type: new FormControl({ value: "", disabled: true }, Validators.required),
    status: new FormControl({ value: "", disabled: true }, Validators.required),
    createdOn: new FormControl({ value: "", disabled: true }, Validators.required),
  })



  constructor(private tasksService: TasksService, private activatedRoute: ActivatedRoute, private fb: FormBuilder) { }

  ngOnInit() {
    this.task$ = this.activatedRoute.params.pipe(map((params) => params['id'] as string),
      switchMap((taskId) => this.tasksService.getTaskById(taskId)))
  }

  updateTaskDetails(taskId: string) {
    this.editing = false
    this.taskForm.disable()
    const updatedTaskDetails = this.taskForm.value

    this.task$ = this.tasksService.updateTask(updatedTaskDetails, taskId)
  }
  allowTaskEdit() {

    this.editing = true

    this.task$?.pipe(
      take(1)
    ).subscribe(task => {
      this.taskForm = this.fb.group({
        title: new FormControl({ value: task.title, disabled: false }, Validators.required),
        description: new FormControl({ value: task.description, disabled: false }, Validators.required),
        type: new FormControl({ value: task.type, disabled: false }, Validators.required),
        status: new FormControl({ value: task.status, disabled: false }, Validators.required),
        createdOn: new FormControl({ value: "", disabled: true }, Validators.required),
      });
    });
  }
}