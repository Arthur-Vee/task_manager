import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { User } from '../../models/user.model'
import { BehaviorSubject, Observable, take } from 'rxjs'
import { usersApiUrl } from '../../utils/constants'

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  subject: BehaviorSubject<User[] | null> = new BehaviorSubject<User[] | null>(null)
  users$ = this.subject.asObservable()

  users: User[] = []


  constructor(private http: HttpClient) { }

  getAllUsers(): Observable<User[]> {
    var response = this.http.get<User[]>(usersApiUrl)
    response.pipe(take(1)).subscribe(users => {
      this.subject.next(users)
      this.users = users
    })
    return response
  }
}
