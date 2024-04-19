import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { User } from '../../models/user.model';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient) {}

  urlBase = 'http://localhost:8010/api';
  url = this.urlBase + '/users';

  authentification(user: any): Observable<any> {
    return this.http.post<User>(this.urlBase + '/users/login', user);
  }

  signup(user: any): Observable<any> {
    return this.http.post<User>(this.urlBase + '/users', user);
  }

  getUser(): Observable<any> {
    let token = localStorage.getItem('token');
    return this.http.get<User>(this.url + '/me/' + token);
  }
}
