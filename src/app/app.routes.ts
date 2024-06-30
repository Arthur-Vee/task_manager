import { Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { TaskComponent } from './components/task/task.component';
import { CreateTaskComponent } from './components/create-task/create-task.component';

export const routes: Routes = [
    { path: "home", component: AppComponent },
    { path: "create-task", component: CreateTaskComponent },
    { path: "tasks-list", component: TaskComponent },
    { path: "task-details", component: TaskComponent },
    //  { path: '**', component: PageNotFoundComponent} to diplay 404(if needed)

];
