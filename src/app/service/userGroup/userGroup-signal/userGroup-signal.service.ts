import { Injectable, signal } from '@angular/core'
import { take } from 'rxjs'
import { Router } from '@angular/router'
import { UserGroup } from '../../../models/user.model'
import { UserGroupService } from '../userGroup.service'

export interface UserGroupState {
  groups: UserGroup[]
  error: string | null
}
@Injectable({
  providedIn: 'root',
})
export class UserGroupSignal {
  public userGroups = signal<UserGroup[]>([])
  public selectedUserGroupSignal = signal<UserGroup | null>(null)
  public errorSignal = signal<string | null>(null)

  constructor(
    private router: Router,
    private userGoupService: UserGroupService
  ) {}

  loadUserGroups(): void {
    this.userGoupService
      .getAllUserGroups()
      .pipe(take(1))
      .subscribe({
        next: (userGroups: UserGroup[]) => this.userGroups.set(userGroups),
        error: (error: Error) =>
          this.errorSignal.set(error.message || 'Error loading tasks'),
      })
  }

  createUserGroup(userGroup: UserGroup): void {
    this.userGoupService.createUserGroup(userGroup).subscribe({
      next: (createdUserGroup) => {
        this.userGroups.update((userGroups) => [
          ...userGroups,
          createdUserGroup,
        ])
        this.router.navigate(['/tasks-list'])
      },
      error: (error) =>
        this.errorSignal.set(error.message || 'Error creating task'),
    })
  }
  updateUserGroup(userGroup: UserGroup): void {
    this.userGoupService.updateUserGroup(userGroup).subscribe({
      next: (updatedUserGroup) => {
        this.userGroups.update((userGroups) => [
          ...userGroups,
          updatedUserGroup,
        ])
        this.router.navigate(['/tasks-list'])
      },
      error: (error) =>
        this.errorSignal.set(error.message || 'Error creating task'),
    })
  }
  deleteFromGroup(userGroup: UserGroup): void {
    this.userGoupService.deleteUsersFromGroup(userGroup).subscribe({
      next: (updatedUserGroup) => {
        this.userGroups.update((userGroups) => [
          ...userGroups,
          updatedUserGroup,
        ])
        location.reload()
      },
      error: (error) =>
        this.errorSignal.set(error.message || 'Error creating task'),
    })
  }
  deleteGroup(groupId: string): void {
    this.userGoupService.deleteGroup(groupId).subscribe({
      next: (updatedUserGroup) => {
        this.userGroups.update((userGroups) => [
          ...userGroups,
          updatedUserGroup,
        ])
        location.reload()
      },
      error: (error) =>
        this.errorSignal.set(error.message || 'Error creating task'),
    })
  }
}
