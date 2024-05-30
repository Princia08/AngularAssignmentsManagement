import {Component, OnInit} from '@angular/core';
import {AssignmentStudentService} from "../../services/student/assignment-student.service";
import {DatePipe} from "@angular/common";
import {environment} from "../../../environments/environment";
import {Router} from "@angular/router";
import {AnimationOptions, LottieComponent} from "ngx-lottie";
import {AnimationItem} from "lottie-web";
import { PageEvent } from '@angular/material/paginator';
import {MatButton} from "@angular/material/button";


@Component({
  selector: 'app-assignment-student',
  standalone: true,
  imports: [
    DatePipe,
    LottieComponent,
    MatButton
  ],
  templateUrl: './assignment-student.component.html',
  styleUrl: './assignment-student.component.css',
})
export class AssignmentStudentComponent implements OnInit {
  assignments: any = [];
  page: number = 1;
  limit: number = 10;
  totalPages!: number;
  nextPage!: number;
  prevPage!: number;
  hasNextPage!: boolean;
  hasPrevPage!: boolean;

  options: AnimationOptions = {
    path: '/assets/books-animation.json',
  };

  constructor(private router: Router, private assignmentService : AssignmentStudentService) {
  }

  ngOnInit() {
    this.loadMyAssignment();
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

  loadMyAssignment() {
this.showAnimation();

this.assignmentService
      .getAssignment(this.page, this.limit)
      .subscribe((data) => {
        let assignments = data.assignments;
        this.totalPages = data.totalPages;
        this.nextPage = data.nextPage;
        this.prevPage = data.prevPage;
        this.hasNextPage = data.hasNextPage;
        this.hasPrevPage = data.hasPrevPage;
        this.assignments = [];
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
        this.hideAnimation();
      });
  }

  seeDetails(id: string) {
    this.router.navigate(['/home/assignmentStudent/details', id]);
  }

  pagePrecedente() {
    this.page = this.page - 1;
    this.loadMyAssignment();
  }
  pageSuivante() {
    this.page = this.page + 1;
    console.log(this.page);
    this.loadMyAssignment();
  }

  premierePage() {
    this.page = 1;
    this.loadMyAssignment();
  }

  dernierePage() {
    this.page = this.totalPages;
    console.log(this.page);
    this.loadMyAssignment();
  }

  // Pour le composant angular material paginator
  handlePageEvent(event: PageEvent) {
    this.page = event.pageIndex + 1;
    this.limit = event.pageSize;
    this.loadMyAssignment();
  }

  protected readonly environment = environment;
}
