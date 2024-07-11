import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { User } from '../../models/user.model'
import { Observable } from 'rxjs'
import { usersApiUrl } from '../../utils/constants'

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private http: HttpClient) { }

  getAllUsers(): Observable<User[]> {
    return this.http.get<User[]>(usersApiUrl)
  }
}
