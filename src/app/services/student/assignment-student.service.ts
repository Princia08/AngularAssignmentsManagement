import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Assignment} from "../../assignments/assignment.model";
import {environment} from "../../../environments/environment.development";

@Injectable({
  providedIn: 'root'
})
export class AssignmentStudentService {

  url = environment.apiURL + '/assignments';

  constructor(private http: HttpClient) {
  }

  getAssignment(): Observable<Assignment[]> {
    let token = localStorage.getItem('token');
    return this.http.get<Assignment[]>(this.url + '/me/'+token);
  }
}