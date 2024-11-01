import { HttpClient } from '@angular/common/http'
import { Inject, Injectable } from '@angular/core'
import {
  LoginForm,
  UpdateUserRoles,
  User,
  UserLogin,
  UserRegistration,
} from '../../models/user.model'
import { map, Observable, tap } from 'rxjs'
import {
  loginApiUrl,
  usersApiUrl,
} from '../../utils/constants'
import { DOCUMENT } from '@angular/common'
import { Store } from '@ngrx/store'
import { selectCurrentUser } from '../../store/user/user.selectors'

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  localStorage: Storage | undefined

  constructor(
    private store: Store,
    private http: HttpClient,
    @Inject(DOCUMENT) private document: Document
  ) {
    this.localStorage = document.defaultView?.localStorage
  }
  getAllUsers(): Observable<User[]> {
    return this.http.get<User[]>(usersApiUrl)
  }

  getIndividualUser(id: string): Observable<User> {
    var body = {
      token: this.localStorage?.getItem('token'),
    }
    return this.http.post<User>(usersApiUrl + id, body)
  }

  signInUser(data: LoginForm): Observable<UserLogin> {
    return this.http.post<UserLogin>(loginApiUrl, data).pipe(
      tap({
        next: (data) => {
          localStorage.setItem('id', data.id),
            localStorage.setItem('isLoggedIn', data.token)
        },
      })
    )
  }

  isUserSignedIn(): string {
    return this.localStorage?.getItem('isLoggedIn') as string
  }

  getUser(): Observable<User> {
    var id = this.localStorage?.getItem('id')
    var body = {
      token: this.localStorage?.getItem('isLoggedIn'),
    }
    return this.http.post<User>(usersApiUrl + id, body)
  }

  registerUser(userData: UserRegistration): Observable<UserLogin> {
    return this.http.post<UserLogin>(usersApiUrl, userData)
  }

  updateUserRole(updateUserRole: UpdateUserRoles): void {
    var body = {
      adminToken: this.localStorage?.getItem('id'),
      updatedUserData: updateUserRole,
    }
    this.http.patch<UpdateUserRoles>(usersApiUrl, body).subscribe()
  }

  getUserRoles(): Observable<string[]> {
    return this.store.select(selectCurrentUser).pipe(
      map((data) => {
        return data?.roles as string[]
      })
    )
  }
}
