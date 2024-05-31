import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Assignment} from "../../assignments/assignment.model";
import {environment} from "../../../environments/environment";

@Injectable({
  providedIn: 'root',
})
export class AssignmentStudentService {
  url = environment.apiURL + '/assignments';

  constructor(private http: HttpClient) {}

  getAssignment(page: number, limit: number): Observable<any> {
    let token = localStorage.getItem('token');
    return this.http.get<Assignment[]>(
      this.url + '/me/' + token + '?page=' + page + '&limit=' + limit
    );
  }

  getAssignmentForNote(): Observable<any> {
    let token = localStorage.getItem('token');
    return this.http.get<Assignment[]>(this.url + '/me/' + token);
  }

  getAssignmentDetails(id: string): Observable<any> {
    return this.http.get<Assignment>(this.url + '/' + id);
  }

  deleteAssignment(id: String): Observable<any> {
    return this.http.delete(this.url + '/' + id);
  }
}
