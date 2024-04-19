import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Matiere } from '../../models/matiere.model';

@Injectable({
  providedIn: 'root',
})
export class MatiereService {
  uri = 'http://localhost:8010/api/matieres';

  constructor(private http: HttpClient) {}

  getMatiere() {
    return fetch(this.uri)
      .then((response) => response.json())
      .then((data) => {
        return data;
      });
  }
  getAllMatieres(): Observable<Matiere[]> {
    return this.http.get<Matiere[]>(this.uri);
  }
}
