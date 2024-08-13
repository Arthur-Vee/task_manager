import { Component, OnInit } from '@angular/core'
import { Task } from '../../models/task.model'
import { TasksService } from '../../service/tasks/tasks.service'
import { NgFor, NgIf, CommonModule } from '@angular/common'
import { MaterialModule } from '../../material.module'
import { Router } from '@angular/router'
import { UsersService } from '../../service/users/users.service'
import { filter, Observable } from 'rxjs'
import { TranslateModule } from '@ngx-translate/core'

import { Store } from '@ngrx/store'
import AppState from '../../store/app.state'
import * as taskActions from '../../store/task/task.actions'
import { selectAllTasks } from '../../store/task/task.selectors'
import { User } from '../../models/user.model'
import { selectCurrentUser } from '../../store/user/user.selectors'

@Component({
  selector: 'app-task',
  standalone: true,
  imports: [
    NgFor,
    NgIf,
    CommonModule,
    MaterialModule,
    TranslateModule
  ],
  templateUrl: './task.component.html',
  styleUrl: './task.component.scss'
})

export class TaskComponent {
  // availableTasks$ = this.taskService.getAllTasks() OLD WAY
  availableTasks$: Observable<Task[]> = this.store.select(selectAllTasks)

  // currentUser$ = this.usersService.user$.pipe(filter(currentUser => !!currentUser)) OLD WAY
  currentUser$: Observable<User | null> = this.store.select(selectCurrentUser)


  constructor(private taskService: TasksService, private router: Router, private usersService: UsersService, private store: Store<AppState>) { }
  ngOnInit(): void {
    this.store.dispatch(taskActions.loadTasks())
  }

  deleteTask(taskId: string): void {
    // this.availableTasks$ = this.taskService.deleteTask(taskId) OLD WAY
    this.store.dispatch(taskActions.deleteTask({ taskId }))
  }
  sendToTaskDetails(task: Task): void {
    this.router.navigate(['/task-details', task.id])
  }
}
