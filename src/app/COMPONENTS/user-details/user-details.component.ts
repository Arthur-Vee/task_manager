import { Component } from '@angular/core'
import { MaterialModule } from '../../material.module'
import { UsersService } from '../../service/users/users.service'
import { ActivatedRoute } from '@angular/router'
import { BehaviorSubject, map, Observable, switchMap, take, tap } from 'rxjs'
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

  individualUserSubject: BehaviorSubject<User | null> = new BehaviorSubject<User | null>(null)
  individualUser$: Observable<User | null> = this.individualUserSubject.asObservable()// this should be the value whitch we put in async pipe in details template

  individulaUserId: string | null = null

  userDetailsForm: FormGroup = this.fb.group({
    defaultRole: new FormControl("USER"),
    assignedUserRole: new FormControl("")
  })

  assigning: boolean = false

  constructor(private usersService: UsersService, private activatedRoute: ActivatedRoute, private fb: FormBuilder) { }

  ngOnInit() {
    this.activatedRoute.params.pipe(map((params) => params['id'] as string),
      tap(data => {
        this.individulaUserId = data
      }),
      switchMap((user) =>
        this.usersService.getIndividualUser(user)
      ),
      take(1)
    ).subscribe(user => {
      this.individualUserSubject.next(user)
    })
  }
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
