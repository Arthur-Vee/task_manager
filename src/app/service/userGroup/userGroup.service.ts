import { Inject, Injectable } from '@angular/core'
import { Observable } from 'rxjs'
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { UserGroup } from '../../models/user.model'
import { usersGroupApiUrl } from '../../utils/constants'
import { DOCUMENT } from '@angular/common'

@Injectable({
  providedIn: 'root',
})
export class UserGroupService {
  localStorage: Storage | undefined
  constructor(
    private http: HttpClient,
    @Inject(DOCUMENT) private document: Document
  ) {
    this.localStorage = document.defaultView?.localStorage
  }

  getAllUserGroups(): Observable<UserGroup[]> {
    let action = 'getAllUserGroups'
    let body = {
      userId: this.localStorage?.getItem('id'),
    }
    return this.http.post<UserGroup[]>(usersGroupApiUrl + action, body)
  }

  createUserGroup(userGroupData: UserGroup): Observable<UserGroup> {
    let body = {
      userId: this.localStorage?.getItem('id'),
      groupName: userGroupData.groupName,
      groupDescription: userGroupData.groupDescription,
      groupMembers: userGroupData.groupMembers,
    }
    return this.http.post<UserGroup>(usersGroupApiUrl, body)
  }
  updateUserGroup(groupData: UserGroup): Observable<UserGroup> {
    let body = {
      userId: this.localStorage?.getItem('id'),
      groupId: groupData.groupId,
      groupName: groupData.groupName,
      groupDescription: groupData.groupDescription,
      groupMembers: groupData.groupMembers,
    }
    return this.http.patch<UserGroup>(usersGroupApiUrl, body)
  }
  deleteUsersFromGroup(group: UserGroup): Observable<UserGroup> {
    let body = {
      userId: this.localStorage?.getItem('id'),
      groupId: group.groupId,
      groupMembers: group.groupMembers,
    }
    return this.http.post<UserGroup>(usersGroupApiUrl + 'deleteUsers', body)
  }
  deleteGroup(groupId: string): Observable<UserGroup> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.localStorage?.getItem('id')}`,
    })
    let body = {
      groupId: groupId,
    }
    return this.http.post<UserGroup>(usersGroupApiUrl + 'deleteGroup', body, {
      headers,
    })
  }
}
