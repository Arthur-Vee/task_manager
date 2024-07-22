import { HttpClient } from '@angular/common/http'
import { Inject, Injectable } from '@angular/core'
import { LoginForm, User, UserLogin, UserRegistration } from '../../models/user.model'
import { BehaviorSubject, Observable, switchMap, take, tap } from 'rxjs'
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
  }

  getAllUsers(): Observable<User[]> {
    return this.http.get<User[]>(usersApiUrl)
  }

  signInUser(data: LoginForm): Observable<User> {
    return this.http.post<UserLogin>(loginApiUrl, data).pipe(tap(
      {
        next: data => {
          localStorage.setItem("id", data.id),
            localStorage.setItem("isLoggedIn", data.token)
          this.isLoggedInSubject.next(data.token)
        }
      }
    ), switchMap(() => {
      return this.getUser().pipe(
        tap((data) => {
          this.userSubject.next(data) // This can be improved
        }))
    }))
  }

  isUserSignedIn(): string {
    return this.localStorage?.getItem("isLoggedIn") as string
  }

  signOutUser(): void {
    localStorage.clear()
    this.isLoggedInSubject.next(null)
    this.router.navigate(["/login"])
  }

  getUser(): Observable<User> {
    var id = this.localStorage?.getItem("id")
    var body = {
      token: this.localStorage?.getItem("token")
    }
    return this.http.post<User>(usersApiUrl + id, body)
  }

  registerUser(userData: UserRegistration) {
    this.http.post<UserLogin>(usersApiUrl, userData).pipe(
    tap(
      {
        next: data => {
          localStorage.setItem("id", data.id),
            localStorage.setItem("isLoggedIn", data.token)
          this.router.navigate(["tasks-list"])
        },
        error: err => {
          return err
        }
      }
    ), switchMap(() => {
      return this.getUser().pipe(
        tap((data) => {
          this.userSubject.next(data) // This can be improved
        }))
    }))
  }
}
