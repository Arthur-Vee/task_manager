import { Injectable, signal } from '@angular/core'
import { Task } from '../../../models/task.model'
import { TasksService } from '../tasks.service'
import { retry, take } from 'rxjs'
import { Router } from '@angular/router'

export interface TaskState {
  tasks: Task[]
  task: Task | null
  error: string | null
}

@Injectable({
  providedIn: 'root',
})
export class TaskSignal {
  public tasks = signal<Task[]>([])
  public selectedTaskSignal = signal<Task | null>(null)
  public errorSignal = signal<string | null>(null)

  constructor(private tasksService: TasksService, private router: Router) {}

  loadAllTasks(): void {
    this.tasksService
      .getAllTasks()
      .pipe(retry(1),take(1))
      .subscribe({
        next: (tasks) => this.tasks.set(tasks),
        error: (error) =>
          this.errorSignal.set(error.message || 'Error loading tasks'),
      })
  }
  loadTaskById(taskId: string): void {
    this.tasksService.getTaskById(taskId).subscribe({
      next: (task) => {
        this.selectedTaskSignal.set(task)
        this.router.navigate(['/task-details', task.id])
      },

      error: (error) =>
        this.errorSignal.set(error.message || 'Error loading task'),
    })
  }
  createTask(task: Task): void {
    this.tasksService.createNewTask(task).subscribe({
      next: (createdTask) => {
        this.tasks.update((tasks) => [...tasks, createdTask])
        this.router.navigate(['/tasks-list'])
      },
      error: (error) =>
        this.errorSignal.set(error.message || 'Error creating task'),
    })
  }
  updateTask(updatedTaskDetails: Task): void {
    this.tasksService.updateTask(updatedTaskDetails).subscribe({
      next: (updatedTask) => {
        const updatedTasks = this.tasks().map((task) =>
          task.id === updatedTask.id ? updatedTask : task
        )
        this.tasks.set(updatedTasks)
      },
      error: (error) =>
        this.errorSignal.set(error.message || 'Error updating task'),
    })
  }
  deleteTask(taskId: string): void {
    this.tasksService.deleteTask(taskId).subscribe({
      next: () => {
        const updatedTasks = this.tasks().filter((task) => task.id !== taskId)
        this.tasks.set(updatedTasks)
      },
      error: (error) =>
        this.errorSignal.set(error.message || 'Error deleting task'),
    })
  }
}
