import { Routes } from '@angular/router'
import { TaskComponent } from './components/task/task.component'
import { CreateTaskComponent } from './components/create-task/create-task.component'
import { TaskDetailsComponent } from './components/task-details/task-details.component'
import { LoginPageComponent } from './components/login-page/login-page.component'
import { authGuard } from './service/guard/auth.guard'
import { loginGuard } from './service/guard/login.guard'
import { RegistrationPageComponent } from './components/registration-page/registration-page.component'
import { UserListComponent } from './components/user-list/user-list.component'
import { UserDetailsComponent } from './components/user-details/user-details.component'

export const routes: Routes = [
    { path: "", canActivate: [authGuard], component: TaskComponent, pathMatch: "full" },
    { path: "create-task", canActivate: [authGuard], component: CreateTaskComponent, data: { requiredRoles: ['ADMIN'] } },
    { path: "tasks-list", canActivate: [authGuard], component: TaskComponent },
    { path: "task-details/:id", canActivate: [authGuard], component: TaskDetailsComponent },
    { path: "register", canActivate: [loginGuard], component: RegistrationPageComponent },
    { path: "login", canActivate: [loginGuard], component: LoginPageComponent },
    { path: "users", canActivate: [authGuard], component: UserListComponent, data: { requiredRoles: ['ADMIN'] } },
    { path: "users/:id", canActivate: [authGuard], component: UserDetailsComponent, data: { requiredRoles: ['ADMIN'] } },
    //  { path: '**', component: PageNotFoundComponent}

]
