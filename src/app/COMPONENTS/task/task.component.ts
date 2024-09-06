import { Component, computed } from '@angular/core'
import { Task } from '../../models/task.model'
import { NgFor, NgIf, CommonModule } from '@angular/common'
import { MaterialModule } from '../../material.module'
import { Observable } from 'rxjs'
import { TranslateModule } from '@ngx-translate/core'
import { Store } from '@ngrx/store'
import AppState from '../../store/app.state'
import { User } from '../../models/user.model'
import { selectCurrentUser } from '../../store/user/user.selectors'
import { TaskSignal } from '../../service/tasks/tasks-signal/tasks-signal.service'

@Component({
  selector: 'app-task',
  standalone: true,
  imports: [NgFor, NgIf, CommonModule, MaterialModule, TranslateModule],
  templateUrl: './task.component.html',
  styleUrl: './task.component.scss',
})
export class TaskComponent {
  availableTasks$ = computed(() => this.tasksSignal.tasksSignal())

  currentUser$: Observable<User | null> = this.store.select(selectCurrentUser)

  constructor(private store: Store<AppState>, public tasksSignal: TaskSignal) {}
  ngOnInit(): void {
    this.tasksSignal.loadAllTasks()
  }

  deleteTask(taskId: string): void {
    this.tasksSignal.deleteTask(taskId)
  }
  sendToTaskDetails(task: Task): void {
    this.tasksSignal.loadTaskById(task.id)
  }
}
