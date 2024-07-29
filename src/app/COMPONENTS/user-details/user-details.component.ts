import { Component } from '@angular/core'
import { MaterialModule } from '../../material.module'
import { UsersService } from '../../service/users/users.service'
import { ActivatedRoute } from '@angular/router'
import { map, Observable, switchMap, tap } from 'rxjs'
import { User, UpdateUserRoles } from '../../models/user.model'
import { CommonModule } from '@angular/common'
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms'

@Component({
  selector: 'app-user-details',
  standalone: true,
  imports: [
    MaterialModule,
    CommonModule,
    ReactiveFormsModule
  ],
  templateUrl: './user-details.component.html',
  styleUrl: './user-details.component.scss'
})
export class UserDetailsComponent {

  individualUser$: Observable<User | null> = this.activatedRoute.params.pipe(
    tap(user => this.individulaUserId = user['id']),
    map(params => params['id'] as string),
    switchMap(id => this.usersService.getIndividualUser(id))
  )

  individulaUserId: string | null = null

  userDetailsForm: FormGroup = this.fb.group({
    defaultRole: new FormControl("USER"),
    assignedUserRole: new FormControl("")
  })

  assigning: boolean = false

  constructor(private usersService: UsersService, private activatedRoute: ActivatedRoute, private fb: FormBuilder) { }

  editUserRole() {
    this.assigning = true
  }
  updateUserRole(updatedUserRole: FormGroup) {
    var filteredRoleArray = Object.values(updatedUserRole).filter(Boolean)
    var updatedUserDetails: UpdateUserRoles = {
      updatedUserId: this.individulaUserId,
      updatedUserRoles: filteredRoleArray
    }
    this.usersService.updateUserRole(updatedUserDetails)
    this.assigning = false
  }
}
