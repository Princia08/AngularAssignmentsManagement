import {Component, OnInit} from '@angular/core';
import {AssignmentStudentService} from "../../services/student/assignment-student.service";
import {DatePipe} from "@angular/common";
import {environment} from "../../../environments/environment";
import {Router} from "@angular/router";
import {AnimationOptions, LottieComponent} from "ngx-lottie";
import {AnimationItem} from "lottie-web";


@Component({
  selector: 'app-assignment-student',
  standalone: true,
  imports: [
    DatePipe,
    LottieComponent
  ],
  templateUrl: './assignment-student.component.html',
  styleUrl: './assignment-student.component.css'
})
export class AssignmentStudentComponent implements OnInit {
  assignments: any= [];

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

    this.assignmentService.getAssignment().subscribe((assignments) => {
      for (let i = 0; i < assignments.length; i++) {
        this.assignments.push({
          id: assignments[i]._id,
          nom: assignments[i].nom,
          dateDeRendu: assignments[i].dateDeRendu,
          rendu: assignments[i].rendu,
          note: assignments[i].note,

          nomMatiere: assignments[i].idMatiere?.nom,
          imageMatiere: assignments[i].idMatiere?.image,

          nomProf :  assignments[i].idMatiere?.prof?.prenom + " " + assignments[i].idMatiere?.prof?.nom,
          prenomProf :  assignments[i].idMatiere?.prof?.prenom,
          imageProf: assignments[i].idMatiere?.prof?.image
        });
      }
      this.hideAnimation();
    });
  }

  seeDetails(id: string) {
    this.router.navigate(['/home/assignmentStudent/details', id])
  }

  protected readonly environment = environment;
}
