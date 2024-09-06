import { Component, computed, OnInit } from '@angular/core'
import { MaterialModule } from '../../material.module'
import { ActivatedRoute } from '@angular/router'
import { map, take, tap } from 'rxjs'
import { CommonModule, NgIf } from '@angular/common'
import {
  FormBuilder,
  FormControl,
  Validators,
  ReactiveFormsModule,
  FormGroup,
} from '@angular/forms'
import { TranslateModule } from '@ngx-translate/core'

import { Store } from '@ngrx/store'
import AppState from '../../store/app.state'
import * as taskActions from '../../store/task/task.actions'
import * as userActions from '../../store/user/user.actions'
import * as userSelectors from '../../store/user/user.selectors'
import { TaskSignal } from '../../service/tasks/tasks-signal/tasks-signal.service'

@Component({
  selector: 'app-task-details',
  standalone: true,
  imports: [
    MaterialModule,
    CommonModule,
    NgIf,
    ReactiveFormsModule,
    TranslateModule,
  ],
  templateUrl: './task-details.component.html',
  styleUrl: './task-details.component.scss',
})
export class TaskDetailsComponent implements OnInit {
  users$ = this.store.select(userSelectors.selectAllUsers)
  currentUserRoles$ = this.store.select(userSelectors.selectCurrentUserRoles)
  selectedTask$ = computed(() => this.tasksSignal.selectedTaskSignal())
  taskId: string = ''
  editing: boolean = false

  taskForm: FormGroup = this.fb.group({
    title: new FormControl(
      { value: this.selectedTask$()?.title, disabled: true },
      Validators.required
    ),
    description: new FormControl(
      { value: '', disabled: true },
      Validators.required
    ),
    type: new FormControl({ value: '', disabled: true }, Validators.required),
    status: new FormControl({ value: '', disabled: true }, Validators.required),
    createdOn: new FormControl(
      { value: '', disabled: true },
      Validators.required
    ),
    assignedTo: new FormControl({ value: '', disabled: true }),
  })

  constructor(
    private activatedRoute: ActivatedRoute,
    private fb: FormBuilder,
    private store: Store<AppState>,
    private tasksSignal: TaskSignal
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params
      .pipe(
        map((params) => params['id'] as string),
        take(1),
        tap((taskId) => {
          this.taskId = taskId
          this.store.dispatch(userActions.loadUsers())
          this.store.dispatch(userActions.getCurrentUser())
          this.tasksSignal.loadTaskById(taskId)
        })
      )
      .subscribe(() => {
        var task = this.selectedTask$()
        if (task) {
          this.taskForm.patchValue({
            title: task?.title,
            description: task?.description,
            type: task?.type,
            status: task?.status,
            createdOn: task?.createdOn,
            assignedTo: task?.assignedTo,
          })
        }
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
      assignedTo: updatedTaskFormDetails.assignedTo,
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
      assignedTo: updatedTaskDetails.assignedTo,
    })
  }

  allowTaskEdit(roles: string[]): void {
    if (roles?.includes('MANAGER')) {
      this.taskForm.get('assignedTo')?.enable()
      this.editing = true
    }
    if (roles?.includes('ADMIN')) {
      this.editing = true
      this.taskForm.get('title')?.enable()
      this.taskForm.get('description')?.enable()
      this.taskForm.get('status')?.enable()
      this.taskForm.get('type')?.enable()
      this.taskForm.get('assignedTo')?.enable()
    }
  }
}
