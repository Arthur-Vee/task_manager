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

  isLoogedInSubject: BehaviorSubject<String | null> = new BehaviorSubject<String | null>(null)
  isLoggedIn$: Observable<String | null> = this.isLoogedInSubject.asObservable()

  localStorage: Storage | undefined

  constructor(private http: HttpClient, @Inject(DOCUMENT) private document: Document, private router: Router) {
    this.localStorage = document.defaultView?.localStorage;
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
          this.getUser()
          this.isLoogedInSubject.next(data.token)
        },
        error: err => {
          return err
        }
      }
    ))
  }

  isUserSignedIn() {
    return this.localStorage?.getItem("isLoggedIn")
  }

  signOutUser() {
    localStorage.clear()
    this.isLoogedInSubject.next(null)
    this.router.navigate(["/login"])
  }

  getUser() {
    var id = this.localStorage?.getItem("id")
    var body = {
      token: this.localStorage?.getItem("token")
    }
    this.http.post<User[]>(usersApiUrl + id, body).pipe(take(1)).subscribe(data => {
      this.userSubject.next(data)
    })
    return
  }
}
