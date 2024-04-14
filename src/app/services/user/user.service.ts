import { Injectable } from '@angular/core';
import { Observable } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { User } from "../../models/user.model";

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(private http: HttpClient) { }

  urlBase = 'http://localhost:8010/api'
  url = this.urlBase + '/users'

  authentification(user: any): Observable<any> {
    return this.http.post<User>(this.urlBase + "/users/login", user);
  }
}
