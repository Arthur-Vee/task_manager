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
import { map, Observable } from 'rxjs'
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

  readonly hideSingleSelectionIndicator = signal(false)
  readonly panelOpenState = signal(false)
  readonly detailsPanelOpenState = signal(false)
  readonly membersDetailsPanelOpenState = signal(false)

  constructor(
    private fb: FormBuilder,
    private store: Store<AppState>,
    public userGroupSignal: UserGroupSignal
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
  getAvailableUsersForGroup(groupMembers: string[] | null): Observable<User[]> {
    return this.users$.pipe(
      map((users) =>
        users.filter((user) => !(groupMembers ?? []).includes(user.id))
      )
    )
  }
  getUsersFromGroup(groupMembers: string[] | null): Observable<User[]> {
    return this.users$.pipe(
      map((users) =>
        users.filter((user) => (groupMembers ?? []).includes(user.id))
      )
    )
  }
  openTab(): void {
    this.membersDetailsPanelOpenState.set(false)
    this.detailsPanelOpenState.set(!this.detailsPanelOpenState())
  }
  openMembers(): void {
    this.detailsPanelOpenState.set(false)
    this.membersDetailsPanelOpenState.set(!this.membersDetailsPanelOpenState())
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
