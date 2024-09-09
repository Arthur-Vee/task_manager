import { Component } from '@angular/core'
import { FormControl, FormGroup, Validators, FormBuilder, ReactiveFormsModule } from '@angular/forms'
import { Task } from '../../models/task.model'
import { MaterialModule } from '../../material.module'
import { NgIf, NgFor, CommonModule } from '@angular/common'
import { TranslateModule } from '@ngx-translate/core'
import { Store } from '@ngrx/store'
import AppState from '../../store/app.state'
import * as taskActions from '../../store/task/task.actions'
import * as userSelectors from '../../store/user/user.selectors'



@Component({
  selector: 'app-create-task',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MaterialModule,
    NgIf,
    NgFor,
    CommonModule,
    TranslateModule
  ],
  templateUrl: './create-task.component.html',
  styleUrl: './create-task.component.scss'
})

export class CreateTaskComponent {
  createTaskForm: FormGroup | null = null
  users$ = this.store.select(userSelectors.selectAllUsers)

  constructor(
    private fb: FormBuilder,
    private store: Store<AppState>
  ) {
    this.createTaskForm = this.fb.group({
      title: new FormControl("", Validators.required),
      description: new FormControl("", Validators.required),
      type: new FormControl("", Validators.required),
      assignedTo: new FormControl("UNASSIGNED")
    })
  }

  createTask() {
    if (this.createTaskForm?.valid) {
      const task: Task = this.createTaskForm.value
      this.store.dispatch(taskActions.createTask({ task }))
      this.createTaskForm.reset()
    } else {
      console.log("Task creation failed.")
    }
  }

}

