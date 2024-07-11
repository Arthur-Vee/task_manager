import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { User } from '../../models/user.model'
import { BehaviorSubject, Observable, take } from 'rxjs'
import { usersApiUrl } from '../../utils/constants'

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  usersSubject: BehaviorSubject<User[] | null> = new BehaviorSubject<User[] | null>(null)
  users$ = this.usersSubject.asObservable()

  constructor(private http: HttpClient) { }

  getAllUsers(): Observable<User[]> {
    var response = this.http.get<User[]>(usersApiUrl)
    response.pipe(take(1)).subscribe(users => {
      this.usersSubject.next(users)
    })
    return response
  }
}
