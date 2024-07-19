import { HttpClient } from '@angular/common/http'
import { Inject, Injectable } from '@angular/core'
import { User, UserLogin } from '../../models/user.model'
import { BehaviorSubject, Observable, take, tap } from 'rxjs'
import { loginApiUrl, usersApiUrl } from '../../utils/constants'
import { DOCUMENT } from '@angular/common'
import { Router } from '@angular/router'

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  userSubject: BehaviorSubject<User[] | null> = new BehaviorSubject<User[] | null>(null)
  user$: Observable<User[] | null> = this.userSubject.asObservable()

  isLoggedInSubject: BehaviorSubject<String | null> = new BehaviorSubject<String | null>(null)
  isLoggedIn$: Observable<String | null> = this.isLoggedInSubject.asObservable()

  localStorage: Storage | undefined

  constructor(private http: HttpClient, @Inject(DOCUMENT) private document: Document, private router: Router) {
    this.localStorage = document.defaultView?.localStorage
  }

  getAllUsers(): Observable<User[]> {
    return this.http.get<User[]>(usersApiUrl)
  }

  signInUser(data: {}): Observable<UserLogin> {
    return this.http.post<UserLogin>(loginApiUrl, data).pipe(tap(
      {
        next: data => {
          localStorage.setItem("id", data.id),
            localStorage.setItem("isLoggedIn", data.token)
          this.getUser().pipe(take(1)).subscribe(data => {
            this.userSubject.next(data)
          })
          this.isLoggedInSubject.next(data.token)
        },
        error: err => {
          return err
        }
      }
    ))
  }

  isUserSignedIn(): string | null | undefined {
    return this.localStorage?.getItem("isLoggedIn")
  }

  signOutUser(): void {
    localStorage.clear()
    this.isLoggedInSubject.next(null)
    this.router.navigate(["/login"])
  }

  getUser() {
    var id = this.localStorage?.getItem("id")
    var body = {
      token: this.localStorage?.getItem("token")
    }
    return this.http.post<User[]>(usersApiUrl + id, body)
  }
}
