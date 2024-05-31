import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem,
  CdkDrag,
  CdkDropList,
} from '@angular/cdk/drag-drop';
import {AssignmentsService} from '../../../services/assignment/assignments.service';
import {Assignment} from '../../assignment.model';
import {filter, map, pairwise, tap, throttleTime} from 'rxjs';

import {Component, OnInit, ViewChild, NgZone} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {
  CdkVirtualScrollViewport,
  ScrollingModule,
} from '@angular/cdk/scrolling';

import {MatListModule} from '@angular/material/list';
import {MatButtonModule} from '@angular/material/button';
import {MatSliderModule} from '@angular/material/slider';
import {MatTable, MatTableModule} from '@angular/material/table';
import {PageEvent, MatPaginatorModule} from '@angular/material/paginator';

import {RenduDirective} from '../../../shared/rendu.directive';
import {RouterLink} from '@angular/router';
import {MatDialog} from '@angular/material/dialog';
import {AssignmentDetailComponent} from '../../assignment-detail/assignment-detail.component';
import {EditAssignmentComponent} from '../../edit-assignment/edit-assignment.component';
import {MatDialogModule} from '@angular/material/dialog';
import {environment} from '../../../../environments/environment.development';
import {MatIcon} from '@angular/material/icon';
import {Router} from '@angular/router';
import {AnimationOptions, LottieComponent} from "ngx-lottie";
import {AnimationItem} from "lottie-web";

@Component({
  selector: 'app-assignment-liste',
  standalone: true,
  imports: [
    CdkDropList,
    CdkDrag,
    CommonModule,
    FormsModule,
    ScrollingModule,
    RouterLink,
    MatButtonModule,
    MatTable,
    MatTableModule,
    MatPaginatorModule,
    MatListModule,
    MatSliderModule,
    RenduDirective,
    MatDialogModule,
    MatIcon,
    LottieComponent,
  ],
  templateUrl: './assignment-liste.component.html',
  styleUrl: './assignment-liste.component.css',
})
export class AssignmentListeComponent implements OnInit {
  todo = ['Get to work', 'Pick up groceries', 'Go home', 'Fall asleep'];

  done = ['Get up', 'Brush teeth', 'Take a shower', 'Check e-mail', 'Walk dog'];

  titre = 'Liste des assignments';
  // Pour la pagination
  page = 1;
  limit = 10;
  totalDocs!: number;
  totalPages!: number;
  nextPage!: number;
  prevPage!: number;
  hasNextPage!: boolean;
  hasPrevPage!: boolean;
  assignments: any = [];
  assignmentCorige: any = [];
  recherche = false;

  options: AnimationOptions = {
    path: '/assets/books-animation.json',
  };

  // pour virtual scroll infini
  @ViewChild('scroller') scroller!: CdkVirtualScrollViewport;

  constructor(
    private assignmentsService: AssignmentsService,
    private ngZone: NgZone,
    private dialog: MatDialog,
    private router: Router
  ) {
  }

  drop(event: CdkDragDrop<Assignment[]>) {
    const draggedItem = event.item.data;
    if (event.previousContainer === event.container) {
      moveItemInArray(
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    } else {
      const dialogRef = this.dialog.open(EditAssignmentComponent, {
        width: '300px',
        data: {assignment: draggedItem},
      });
      dialogRef.afterClosed().subscribe((result) => {
        if (result) {
          transferArrayItem(
            event.previousContainer.data,
            event.container.data,
            event.previousIndex,
            event.currentIndex
          );
        }
      });
    }
  }

  ngOnInit() {
    this.getAssignmentsNonCorrigerFromServicePourScrollInfini();
    this.getAssignmentsCorrigerFromServicePourScrollInfini();
  }

  rechercher() {
    this.recherche = true;
  }

  pagination() {
    this.recherche = false;
  }

  searchQuery = '';
  filteredAssignments = [...this.assignments];
  filteredAssignmentsCorrige = [...this.assignmentCorige];

  // filtrer par nom assignment
  filterList() {
    const query = this.searchQuery.toLowerCase();
    let list: Assignment[] = this.assignments;
    let list2: Assignment[] = this.assignmentCorige;

    this.filteredAssignments = list.filter(assignment =>
      assignment.nom.toLowerCase().includes(query)
    );
    this.filteredAssignmentsCorrige = list2.filter(assignment =>
      assignment.nom.toLowerCase().includes(query)
    );
  }

  showAnimation(): void {
    const animationContainer = document.querySelector('.animation-container') as HTMLElement;
    if (animationContainer) {
      animationContainer.style.display = 'flex';
    }
  }

  hideAnimation(): void {
    const animationContainer = document.querySelector('.animation-container') as HTMLElement;
    if (animationContainer) {
      animationContainer.style.display = 'none';
    }
  }

  animationCreated(animationItem: AnimationItem): void {
    console.log(animationItem);
  }

  getAssignmentsFromService() {
    // on récupère les assignments depuis le service
    this.assignmentsService
      .getAssignmentsPagines(this.page, this.limit)
      .subscribe((data) => {
        // les données arrivent ici au bout d'un certain temps
        console.log('Données arrivées');
        console.log(data);
        this.assignments = data.docs;
        this.totalDocs = data.totalDocs;
        this.totalPages = data.totalPages;
        this.nextPage = data.nextPage;
        this.prevPage = data.prevPage;
        this.hasNextPage = data.hasNextPage;
        this.hasPrevPage = data.hasPrevPage;
      });
    console.log('Requête envoyée');
  }

  getAssignmentsFromServicePourScrollInfini() {
    // on récupère les assignments depuis le service
    this.assignmentsService
      .getAssignmentsPagines(this.page, this.limit)
      .subscribe((data) => {
        // les données arrivent ici au bout d'un certain temps
        console.log('Données arrivées');
        console.log(data);
        let assignments = data.assignments;
        //this.assignments = [...this.assignments, ...data.assignments];
        for (let i = 0; i < assignments.length; i++) {
          this.assignments.push({
            id: assignments[i]._id,
            nom: assignments[i].nom,
            dateDeRendu: assignments[i].dateDeRendu,
            rendu: assignments[i].rendu,
            note: assignments[i].note,

            nomMatiere: assignments[i].idMatiere?.nom,
            imageMatiere: assignments[i].idMatiere?.image,

            nomProf:
              assignments[i].idMatiere?.prof?.prenom +
              ' ' +
              assignments[i].idMatiere?.prof?.nom,
            prenomProf: assignments[i].idMatiere?.prof?.prenom,
            imageProf: assignments[i].idMatiere?.prof?.image,
          });
        }
        this.totalDocs = data.totalDocs;
        this.totalPages = data.totalPages;
        this.nextPage = data.nextPage;
        this.prevPage = data.prevPage;
        this.hasNextPage = data.hasNextPage;
        this.hasPrevPage = data.hasPrevPage;
        console.log(this.totalDocs);
      });
  }

  getAssignmentsNonCorrigerFromServicePourScrollInfini() {
    // on récupère les assignments depuis le service
    this.assignmentsService
      .getAssignmentsNonCorrigerPagines(this.page, this.limit)
      .subscribe((data) => {
        // les données arrivent ici au bout d'un certain temps
        console.log('Données arrivées');
        console.log(data);
        let assignments = data.assignments;
        // this.assignments = [...this.assignments, ...data.assignments];
        this.assignments = [];
        for (let i = 0; i < assignments.length; i++) {
          this.assignments.push({
            id: assignments[i]._id,
            nom: assignments[i].nom,
            dateDeRendu: assignments[i].dateDeRendu,
            rendu: assignments[i].rendu,
            note: assignments[i].note,
            file: assignments[i].file,
            nomMatiere: assignments[i].idMatiere?.nom,
            imageMatiere: assignments[i].idMatiere?.image,

            nomProf:
              assignments[i].idMatiere?.prof?.prenom +
              ' ' +
              assignments[i].idMatiere?.prof?.nom,
            prenomProf: assignments[i].idMatiere?.prof?.prenom,
            imageProf: assignments[i].idMatiere?.prof?.image,
          });
        }
        this.totalDocs = data.totalDocs;
        this.totalPages = data.totalPages;
        this.nextPage = data.nextPage;
        this.prevPage = data.prevPage;
        this.hasNextPage = data.hasNextPage;
        this.hasPrevPage = data.hasPrevPage;

        console.log(this.totalDocs);
      });
    console.log('Requête envoyée');
  }

  getAssignmentsCorrigerFromServicePourScrollInfini() {

    this.showAnimation();

    // on récupère les assignments depuis le service
    this.assignmentsService
      .getAssignmentsCorrigerPagines(this.page, this.limit)
      .subscribe((data) => {

        // les données arrivent ici au bout d'un certain temps
        console.log('Données arrivées');

        this.hideAnimation();

        //this.assignmentCorige = [...this.assignmentCorige, ...data.assignments];
        let assignments = data.assignments;
        //this.assignments = [...this.assignments, ...data.assignments];
        this.assignmentCorige = [];
        for (let i = 0; i < assignments.length; i++) {
          this.assignmentCorige.push({
            id: assignments[i]._id,
            nom: assignments[i].nom,
            dateDeRendu: assignments[i].dateDeRendu,
            rendu: assignments[i].rendu,
            note: assignments[i].note,
            file: assignments[i].file,
            nomMatiere: assignments[i].idMatiere?.nom,
            imageMatiere: assignments[i].idMatiere?.image,

            nomProf:
              assignments[i].idMatiere?.prof?.prenom +
              ' ' +
              assignments[i].idMatiere?.prof?.nom,
            prenomProf: assignments[i].idMatiere?.prof?.prenom,
            imageProf: assignments[i].idMatiere?.prof?.image,
          });
        }
        this.totalDocs = data.totalDocs;
        this.totalPages = data.totalPages;
        this.nextPage = data.nextPage;
        this.prevPage = data.prevPage;
        this.hasNextPage = data.hasNextPage;
        this.hasPrevPage = data.hasPrevPage;
      });
    console.log('Requête envoyée');
  }

  pagePrecedente() {
    this.page = this.prevPage;
    this.getAssignmentsNonCorrigerFromServicePourScrollInfini(); //
    this.getAssignmentsCorrigerFromServicePourScrollInfini();
  }

  pageSuivante() {
    this.page = this.nextPage;
    this.getAssignmentsNonCorrigerFromServicePourScrollInfini(); //
    this.getAssignmentsCorrigerFromServicePourScrollInfini();
  }

  premierePage() {
    this.page = 1;
    this.getAssignmentsNonCorrigerFromServicePourScrollInfini(); //
    this.getAssignmentsCorrigerFromServicePourScrollInfini();
  }

  dernierePage() {
    this.page = this.totalPages;
    this.getAssignmentsNonCorrigerFromServicePourScrollInfini(); //
    this.getAssignmentsCorrigerFromServicePourScrollInfini();
  }

  // Pour le composant angular material paginator
  handlePageEvent(event: PageEvent) {
    this.page = event.pageIndex + 1;
    this.limit = event.pageSize;
    this.getAssignmentsNonCorrigerFromServicePourScrollInfini(); //
    this.getAssignmentsCorrigerFromServicePourScrollInfini();
  }

  seeDetails(id: string) {
    this.router.navigate(['/home/assignmentStudent/details', id]);
  }

  protected readonly environment = environment;
}
