import { Component, signal } from '@angular/core'
import { UsersService } from '../../service/users/users.service'
import { NgIf, NgFor, CommonModule } from '@angular/common'
import { MaterialModule } from '../../material.module'
import { Router } from '@angular/router'

@Component({
  selector: 'app-user-list',
  standalone: true,
  imports: [
    NgFor,
    NgIf,
    CommonModule,
    MaterialModule
  ],
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.scss'
})
export class UserListComponent {
  allUsers$ = this.usersService.getAllUsers()
  readonly panelOpenState = signal(false)

  constructor(private usersService: UsersService, private router: Router) { }

  redirectToUserDetails(userId: string) {
    this.router.navigate(['users/' + userId])
  }

}
