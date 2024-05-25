import {Component, OnInit} from '@angular/core';
import {AssignmentStudentService} from "../../services/student/assignment-student.service";
import {Assignment} from "../../assignments/assignment.model";
import {DatePipe} from "@angular/common";
import {environment} from "../../../environments/environment.development";


@Component({
  selector: 'app-assignment-student',
  standalone: true,
  imports: [
    DatePipe
  ],
  templateUrl: './assignment-student.component.html',
  styleUrl: './assignment-student.component.css'
})
export class AssignmentStudentComponent implements OnInit {
  assignments: any= [];

  constructor(private assignmentService : AssignmentStudentService) {
  }

  ngOnInit() {
    this.loadMyAssignment();
  }

  loadMyAssignment() {
    this.assignmentService.getAssignment().subscribe((assignments) => {
      for (let i = 0; i < assignments.length; i++) {
        this.assignments.push({
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
    });
  }

  protected readonly environment = environment;
}
