import { Component, computed } from '@angular/core'
import { Task } from '../../models/task.model'
import { NgFor, NgIf, CommonModule } from '@angular/common'
import { MaterialModule } from '../../material.module'
import { Router } from '@angular/router'
import { Observable } from 'rxjs'
import { TranslateModule } from '@ngx-translate/core'
import { Store } from '@ngrx/store'
import AppState from '../../store/app.state'
import { User } from '../../models/user.model'
import { selectCurrentUser } from '../../store/user/user.selectors'
import { TaskSignalStore } from '../../service/tasks/tasks-signal-store/tasks-signal-store.service'

@Component({
  selector: 'app-task',
  standalone: true,
  imports: [NgFor, NgIf, CommonModule, MaterialModule, TranslateModule],
  templateUrl: './task.component.html',
  styleUrl: './task.component.scss',
})
export class TaskComponent {
  availableTasks$ = computed(() => this.tasksSignalStore.tasksSignal())

  currentUser$: Observable<User | null> = this.store.select(selectCurrentUser)

  constructor(
    private router: Router,
    private store: Store<AppState>,
    public tasksSignalStore: TaskSignalStore
  ) {}
  ngOnInit(): void {
    this.tasksSignalStore.loadAllTasks()
  }

  deleteTask(taskId: string): void {
    this.tasksSignalStore.deleteTask(taskId)
  }
  sendToTaskDetails(task: Task): void {
    this.tasksSignalStore.loadTaskById(task.id)
  }
}
