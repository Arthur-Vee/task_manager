import { Routes } from '@angular/router'
import { AppComponent } from './app.component'
import { TaskComponent } from './components/task/task.component'
import { CreateTaskComponent } from './components/create-task/create-task.component'
import { TaskDetailsComponent } from './components/task-details/task-details.component'

export const routes: Routes = [
    { path: "home", component: AppComponent },
    { path: "create-task", component: CreateTaskComponent },
    { path: "tasks-list", component: TaskComponent },
    { path: "task-details/:id", component: TaskDetailsComponent },
    //  { path: '**', component: PageNotFoundComponent} to diplay 404(if needed)

]
