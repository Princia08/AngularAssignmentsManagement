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

  getAllMatieres(): Observable<Matiere[]> {
    return this.http.get<Matiere[]>(this.uri);
  }

  addMatiere(matiere?: Matiere): Observable<Matiere> {
    return this.http.post<Matiere>(this.uri, matiere);
  }
}
