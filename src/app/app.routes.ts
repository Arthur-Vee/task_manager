import { Routes } from '@angular/router';
import { CreateTaskComponent } from './COMPONENTS/create-task/create-task.component';
import { AppComponent } from './app.component';
import { TaskComponent } from './COMPONENTS/task/task.component';

export const routes: Routes = [
    { path: "home", component: AppComponent },
    { path: "create-task", component: CreateTaskComponent },
    { path: "task-list", component: TaskComponent },
    { path: "task-details", component: TaskComponent }, // This will change once task-details component is ready
    //  { path: '**', component: PageNotFoundComponent} to diplay 404(if needed)

];
