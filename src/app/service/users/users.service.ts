import { HttpClient } from '@angular/common/http'
import { Inject, Injectable } from '@angular/core'
import { LoginForm, UpdateUserRoles, User, UserLogin, UserRegistration } from '../../models/user.model'
import { BehaviorSubject, map, Observable, take, tap } from 'rxjs'
import { loginApiUrl, usersApiUrl } from '../../utils/constants'
import { DOCUMENT } from '@angular/common'
import { Router } from '@angular/router'

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  userSubject: BehaviorSubject<User | null> = new BehaviorSubject<User | null>(null)
  user$: Observable<User | null> = this.userSubject.asObservable()

  isLoggedInSubject: BehaviorSubject<String | null> = new BehaviorSubject<String | null>(null)
  isLoggedIn$: Observable<String | null> = this.isLoggedInSubject.asObservable()

  localStorage: Storage | undefined

  constructor(private http: HttpClient, @Inject(DOCUMENT) private document: Document, private router: Router) {
    this.localStorage = document.defaultView?.localStorage

    this.getUser().pipe(take(1)).subscribe(
      user => {
        this.userSubject.next(user)
      }
    )
  }
  getAllUsers(): Observable<User[]> {
    return this.http.get<User[]>(usersApiUrl)
  }

  getIndividualUser(id: string): Observable<User> {
    var body = {
      token: this.localStorage?.getItem("token")
    }
    return this.http.post<User>(usersApiUrl + id, body)
  }

  signInUser(data: LoginForm): Observable<UserLogin> {
    return this.http.post<UserLogin>(loginApiUrl, data).pipe(tap(
      {
        next: data => {
          localStorage.setItem("id", data.id),
            localStorage.setItem("isLoggedIn", data.token)
          this.isLoggedInSubject.next(data.token)
          this.userSubject.next(data.user)
        }
      }
    )
    )
  }

  isUserSignedIn(): string {
    return this.localStorage?.getItem("isLoggedIn") as string
  }

  signOutUser(): void {
    localStorage.removeItem('isLoggedIn')
    localStorage.removeItem("id")
    this.router.navigate(["/login"])
    this.isLoggedInSubject.next(null)
    this.userSubject.next(null)
  }

  getUser(): Observable<User> {
    var id = this.localStorage?.getItem("id")
    var body = {
      token: this.localStorage?.getItem("token")
    }
    return this.http.post<User>(usersApiUrl + id, body)
  }

  registerUser(userData: UserRegistration): Observable<UserLogin> {
    return this.http.post<UserLogin>(usersApiUrl, userData)
  }

  updateUserRole(updateUserRole: UpdateUserRoles): void {
    var body = {
      adminToken: this.localStorage?.getItem("id"),
      updatedUserData: updateUserRole
    }
    this.http.patch<UpdateUserRoles>(usersApiUrl, body).subscribe()
  }

  async getUserRoles(): Promise<Observable<void>> {
    return await this.user$.pipe(map(data => {
      data?.roles as string[] | undefined
    }))
  }
}
