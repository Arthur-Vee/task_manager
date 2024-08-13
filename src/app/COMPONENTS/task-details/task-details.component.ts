import { Component, OnInit } from '@angular/core'
// import { Task } from '../../models/task.model' OLD WAY
import { MaterialModule } from '../../material.module'
// import { TasksService } from '../../service/tasks/tasks.service' OLD WAY
import { ActivatedRoute } from '@angular/router'
import { filter, map, take } from 'rxjs'
import { CommonModule, NgIf } from '@angular/common'
import { FormBuilder, FormControl, Validators, ReactiveFormsModule, FormGroup } from '@angular/forms'
import { UsersService } from '../../service/users/users.service'
import { TranslateModule } from '@ngx-translate/core'

import { Store } from '@ngrx/store'
import AppState from '../../store/app.state'
import * as taskActions from '../../store/task/task.actions'
import * as taskSelectors from '../../store/task/task.selectors'
import * as selectors from '../../store/user/user.selectors'
import * as userActions from '../../store/user/user.actions'

@Component({
  selector: 'app-task-details',
  standalone: true,
  imports: [
    MaterialModule,
    CommonModule,
    NgIf,
    ReactiveFormsModule,
    TranslateModule
  ],
  templateUrl: './task-details.component.html',
  styleUrl: './task-details.component.scss'
})
export class TaskDetailsComponent implements OnInit {

  // task$: Observable<Task | null> = this.store.select(taskSelectors.selectTaskById) OLD WAY
  users$ = this.store.select(selectors.selectAllUsers)
  taskId: string = ""
  editing: boolean = false

  currentUserRoles: string[] | null = null

  taskForm: FormGroup = this.fb.group({
    title: new FormControl({ value: "", disabled: true }, Validators.required),
    description: new FormControl({ value: "", disabled: true }, Validators.required),
    type: new FormControl({ value: "", disabled: true }, Validators.required),
    status: new FormControl({ value: "", disabled: true }, Validators.required),
    createdOn: new FormControl({ value: "", disabled: true }, Validators.required),
    assignedTo: new FormControl({ value: "", disabled: true })
  })

  constructor(
    // private tasksService: TasksService, OLD WAY
    private activatedRoute: ActivatedRoute,
    private fb: FormBuilder,
    private usersService: UsersService,
    private store: Store<AppState>
  ) { }

  ngOnInit(): void {
    this.activatedRoute.params.pipe(map((params) => params['id'] as string),
      take(1)
    ).subscribe((taskId) => {
      this.taskId = taskId
      this.store.dispatch(taskActions.loadIndividualTask({ taskId }))
      this.store.dispatch(userActions.loadUsers()) // loading users for template
      this.store.select(taskSelectors.selectTaskById).pipe(
        filter(task => !!task && task.id === taskId),
        take(1)).
        subscribe(task => {
          if (task) {
            this.taskForm.patchValue({
              title: task.title,
              description: task.description,
              type: task.type,
              status: task.status,
              createdOn: task.createdOn,
              assignedTo: task.assignedTo
            })
          }
        })
    }
    )


    this.usersService.getUser().pipe(take(1)).subscribe(
      data => {
        return this.currentUserRoles = data?.roles
      })
  }

  updateTaskDetails(): void {
    const updatedTaskFormDetails = this.taskForm.value
    const updatedTaskDetails = {
      id: this.taskId,
      title: updatedTaskFormDetails.title,
      description: updatedTaskFormDetails.description,
      type: updatedTaskFormDetails.type,
      status: updatedTaskFormDetails.status,
      createdOn: updatedTaskFormDetails.createdOn,
      assignedTo: updatedTaskFormDetails.assignedTo
    }
    this.store.dispatch(taskActions.updateTask({ updatedTaskDetails }))

    this.editing = false
    this.taskForm.get('title')?.disable()
    this.taskForm.get('description')?.disable()
    this.taskForm.get('status')?.disable()
    this.taskForm.get('type')?.disable()
    this.taskForm.get('assignedTo')?.disable()
    this.taskForm.patchValue({
      title: updatedTaskDetails.title,
      description: updatedTaskDetails.description,
      type: updatedTaskDetails.type,
      status: updatedTaskDetails.status,
      createdOn: updatedTaskDetails.createdOn,
      assignedTo: updatedTaskDetails.assignedTo
    })
  }

  allowTaskEdit(): void {
    if (this.currentUserRoles?.includes('MANAGER')) {
      this.taskForm.get('assignedTo')?.enable()
      this.editing = true
    }
    if (this.currentUserRoles?.includes('ADMIN')) {
      this.editing = true
      this.taskForm.get('title')?.enable()
      this.taskForm.get('description')?.enable()
      this.taskForm.get('status')?.enable()
      this.taskForm.get('type')?.enable()
      this.taskForm.get('assignedTo')?.enable()
    }
  }
}