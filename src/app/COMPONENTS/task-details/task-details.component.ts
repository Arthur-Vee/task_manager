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

  task$: Observable<Task | null> = this.tasksService.task$
  taskId: string = ""
  editing: boolean = false

  taskForm: FormGroup = this.fb.group({
    title: new FormControl({ value: "", disabled: true }, Validators.required),
    description: new FormControl({ value: "", disabled: true }, Validators.required),
    type: new FormControl({ value: "", disabled: true }, Validators.required),
    status: new FormControl({ value: "", disabled: true }, Validators.required),
    createdOn: new FormControl({ value: "", disabled: true }, Validators.required),
  })

  constructor(private tasksService: TasksService, private activatedRoute: ActivatedRoute, private fb: FormBuilder) { }

  ngOnInit() {
    this.activatedRoute.params.pipe(map((params) => params['id'] as string),
      switchMap((taskId) => this.tasksService.getTaskById(taskId)), take(1)
    ).subscribe(task => {
      this.tasksService.taskSubject.next(task)
      this.taskId = task.id
      this.taskForm.patchValue({
        title: task.title,
        description: task.description,
        type: task.type,
        status: task.status,
        createdOn: task.createdOn
      })
    })
  }

  updateTaskDetails() {
    const updatedTaskDetails = this.taskForm.value

    this.tasksService.updateTask(updatedTaskDetails, this.taskId).pipe(
      take(1)
    ).subscribe({
      next: task => {
        this.tasksService.taskSubject.next(task)
        this.editing = false
        this.taskForm.get('title')?.disable()
        this.taskForm.get('description')?.disable()
        this.taskForm.get('status')?.disable()
        this.taskForm.get('type')?.disable()
        this.taskForm.patchValue({
          title: task.title,
          description: task.description,
          type: task.type,
          status: task.status,
          createdOn: task.createdOn
        })
      },
      error: err => {
        this.editing = true
        this.taskForm.get('title')?.enable()
        this.taskForm.get('description')?.enable()
        this.taskForm.get('status')?.enable()
        this.taskForm.get('type')?.enable()
      },
    })
  }

  allowTaskEdit() {
    this.editing = true
    this.taskForm.get('title')?.enable()
    this.taskForm.get('description')?.enable()
    this.taskForm.get('status')?.enable()
    this.taskForm.get('type')?.enable()
  }
}