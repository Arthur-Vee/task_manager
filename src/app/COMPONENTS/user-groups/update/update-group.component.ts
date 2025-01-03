import { Component, signal } from '@angular/core'
import {
  FormControl,
  FormGroup,
  FormBuilder,
  ReactiveFormsModule,
} from '@angular/forms'
import { MaterialModule } from '../../../material.module'
import { NgIf, NgFor, CommonModule } from '@angular/common'
import { TranslateModule } from '@ngx-translate/core'
import { Store } from '@ngrx/store'
import AppState from '../../../store/app.state'
import * as userSelectors from '../../../store/user/user.selectors'
import * as userActions from '../../../store/user/user.actions'
import { User, UserGroup } from '../../../models/user.model'
import { UserGroupSignal } from '../../../service/userGroup/userGroup-signal/userGroup-signal.service'
import { BehaviorSubject, map, take } from 'rxjs'
import { MatListOption } from '@angular/material/list'

@Component({
  selector: 'app-update-group',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MaterialModule,
    NgIf,
    NgFor,
    CommonModule,
    TranslateModule,
  ],
  templateUrl: './update-group.component.html',
  styleUrl: './update-group.component.scss',
})
export class UpdateComponent {
  updateUserGroupForm: FormGroup | null = null
  users$ = this.store.select(userSelectors.selectAllUsers)
  
  availableUsers$ = new BehaviorSubject<User[]>([])
  groupUsers$ = new BehaviorSubject<User[]>([])
  

  
  readonly panelState = signal({
    panelOpenState: false,
    detailsPanelOpenState: false,
    membersDetailsPanelOpenState: false,
  })




  constructor(
    private fb: FormBuilder,
    private store: Store<AppState>,
    public userGroupSignal: UserGroupSignal,
  ) {
    this.updateUserGroupForm = this.fb.group({
      groupName: new FormControl(''),
      groupDescription: new FormControl(''),
      groupMembers: new FormControl(''),
    })
  }
  ngOnInit(): void {
    this.userGroupSignal.loadUserGroups()
    this.store.dispatch(userActions.loadUsers())
  }

  onGroupSelect(groupMembers: string[] | null): void {
    this.panelState().panelOpenState = true
    this.users$.pipe(
      take(1),
      map((users) => {
        const availableUsers = users.filter(
          (user) => !(groupMembers ?? []).includes(user.id)
        )
        const groupUsers = users.filter((user) =>
          (groupMembers ?? []).includes(user.id)
        )
        this.panelState().panelOpenState = true
        this.availableUsers$.next(availableUsers)
        this.groupUsers$.next(groupUsers)
      })
    ).subscribe()
  }
  updateUserGroup(id: string | null): void {
    if (this.updateUserGroupForm?.valid) {
      const body: UserGroup = {
        groupId: id,
        groupName: this.updateUserGroupForm.value.groupName,
        groupDescription: this.updateUserGroupForm.value.groupDescription,
        groupMembers: this.updateUserGroupForm.value.groupMembers,
      }
      this.userGroupSignal.updateUserGroup(body)
    }
    this.updateUserGroupForm?.reset()
  }
  deleteUserGroup(groupId: string | null = null): void {
    if (groupId) {
      this.userGroupSignal.deleteGroup(groupId)
    }
  }
  deletUserGroupMembers(
    selectedOptions: MatListOption[],
    group: UserGroup
  ): void {
    const selectUserIds: string[] = selectedOptions.map(
      (option) => option.value.id
    )
    const userGroupData: UserGroup = {
      groupId: group.groupId,
      groupName: group.groupName,
      groupDescription: group.groupDescription,
      groupMembers: selectUserIds,
    }
    this.userGroupSignal.deleteFromGroup(userGroupData)
  }
}
