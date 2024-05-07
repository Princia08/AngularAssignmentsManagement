import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {User} from '../../models/user.model';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient) {
  }

  url = 'http://localhost:8010/api/users';

  authentification(user: any): Observable<any> {
    return this.http.post<User>(this.url + '/login', user);
  }

  signup(user: any): Observable<any> {
    return this.http.post<User>(this.url, user);
  }

  updateUser(user? : User): Observable<any> {
    return this.http.put<User>(this.url, user);
  }

  getUser(): Observable<any> {
    let token = localStorage.getItem('token');
    return this.http.get<User>(this.url + '/me/' + token);
  }

  getAllInactivatedUsers(): Observable<any> {
    return this.http.get<User>(this.url + '/inactivated');
  }
}
