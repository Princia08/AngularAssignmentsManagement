import { Injectable } from '@angular/core';
import { Assignment } from '../../assignments/assignment.model';
import { Observable, forkJoin, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { LoggingService } from '../../shared/log/logging.service';
import { HttpClient } from '@angular/common/http';

// importation des données de test
import { bdInitialAssignments } from '../../shared/data';
import {environment} from "../../../environments/environment";

@Injectable({
  providedIn: 'root',
})
export class AssignmentsService {
  assignments: Assignment[] = [];

  constructor(private logService: LoggingService, private http: HttpClient) {}

  //uri = 'https://backendassigments.onrender.com/api/assignments';
  uri = environment.apiURL + '/assignments';

  // retourne tous les assignments
  getAssignments(): Observable<Assignment[]> {
    return this.http.get<Assignment[]>(this.uri);
  }

  getAssignmentsPagines(page: number, limit: number): Observable<any> {
    return this.http.get<Assignment[]>(
      this.uri + '?page=' + page + '&limit=' + limit
    );
  }

  // renvoie un assignment par son id, renvoie undefined si pas trouvé
  getAssignment(id: number): Observable<Assignment | undefined> {
    return this.http.get<Assignment>(this.uri + '/' + id).pipe(
      catchError(
        this.handleError<any>(
          '### catchError: getAssignments by id avec id=' + id
        )
      )
      /*
      map(a => {
        a.nom += " MODIFIE PAR LE PIPE !"
        return a;
      }),
      tap(a => console.log("Dans le pipe avec " + a.nom)),
      map(a => {
        a.nom += " MODIFIE UNE DEUXIEME FOIS PAR LE PIPE !";
        return a;
      })
      */
    );
    //let a = this.assignments.find(a => a.id === id);
    //return of(a);
  }

  // Methode appelée par catchError, elle doit renvoyer
  // i, Observable<T> où T est le type de l'objet à renvoyer
  // (généricité de la méthode)
  private handleError<T>(operation: any, result?: T) {
    return (error: any): Observable<T> => {
      console.log(error); // pour afficher dans la console
      console.log(operation + ' a échoué ' + error.message);

      return of(result as T);
    };
  }

  // ajoute un assignment et retourne une confirmation
  addAssignment(assignment: any): Observable<any> {
    assignment.token = localStorage.getItem('token');
    return this.http.post<Assignment>(this.uri, assignment);
  }

  updateAssignment(assignment: Assignment): Observable<any> {
    // l'assignment passé en paramètre est le même objet que dans le tableau
    // plus tard on verra comment faire avec une base de données
    // il faudra faire une requête HTTP pour envoyer l'objet modifié
    this.logService.log(assignment.nom, 'modifié');
    //return of("Assignment modifié avec succès");
    return this.http.put<Assignment>(this.uri, assignment);
  }

  deleteAssignment(assignment: Assignment): Observable<any> {
    // on va supprimer l'assignment dans le tableau
    //let pos = this.assignments.indexOf(assignment);
    //this.assignments.splice(pos, 1);
    this.logService.log(assignment.nom, 'supprimé');
    return this.http.delete(this.uri + '/' + assignment._id);
  }

  // VERSION NAIVE (on ne peut pas savoir quand l'opération des 1000 insertions est terminée)
  peuplerBD() {
    // on utilise les données de test générées avec mockaroo.com pour peupler la base
    // de données
    bdInitialAssignments.forEach((a) => {
      let nouvelAssignment = new Assignment();
      nouvelAssignment.nom = a.nom;
      nouvelAssignment.dateDeRendu = new Date(a.dateDeRendu);
      nouvelAssignment.rendu = a.rendu;

      this.addAssignment(nouvelAssignment).subscribe(() => {
        console.log('Assignment ' + a.nom + ' ajouté');
      });
    });
  }

  // peuplerBDavecForkJoin(): Observable<any> {
  //   let appelsVersAddAssignment: Observable<any>[] = [];

  //   bdInitialAssignments.forEach((a) => {
  //     const nouvelAssignment = new Assignment();
  //     nouvelAssignment.nom = a.nom;
  //     nouvelAssignment.dateDeRendu = new Date(a.dateDeRendu);
  //     nouvelAssignment.rendu = a.rendu;
  //     nouvelAssignment.idUser = a.idUser;
  //     nouvelAssignment.idMatiere = a.idMatiere;
  //     nouvelAssignment.note = a.note;
  //     nouvelAssignment.file = a.file;
  //     nouvelAssignment.remarque = a.remarque;

  //     appelsVersAddAssignment.push(this.addAssignment(nouvelAssignment));
  //   });

  //   return forkJoin(appelsVersAddAssignment);
  // }

  getAssignmentsbyMatierePagines(
    page: number = 1,
    limit: number = 10,
    idmatiere: string
  ): Observable<any> {
    return this.http.get<Assignment[]>(
      this.uri + '/matiere/' + idmatiere + '?page=' + page + '&limit=' + limit
    );
  }

  getAssignmentsCorrigerPagines(page: number, limit: number): Observable<any> {
    //get token from localstorage
    let token = localStorage.getItem('token');
    return this.http.get<any>(
      this.uri +
        '/matiere/Corriger?page=' +
        page +
        '&limit=' +
        limit +
        '&token=' +
        token
    );
  }

  getAssignmentsNonCorrigerPagines(
    page: number,
    limit: number
  ): Observable<any> {
    //get token from localstorage
    let token = localStorage.getItem('token');
    return this.http.get<Assignment[]>(
      this.uri +
        '/matiere/nonCorriger?page=' +
        page +
        '&limit=' +
        limit +
        '&token=' +
        token
    );
  }
}
