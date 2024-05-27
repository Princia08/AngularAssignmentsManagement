import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {environment} from "../../../environments/environment.development";
import {DatePipe} from "@angular/common";
import {MatIcon} from "@angular/material/icon";
import {AssignmentStudentService} from "../../services/student/assignment-student.service";

@Component({
  selector: 'app-assignment-student-details',
  standalone: true,
  imports: [
    DatePipe,
    MatIcon
  ],
  templateUrl: './assignment-student-details.component.html',
  styleUrl: './assignment-student-details.component.css'
})
export class AssignmentStudentDetailsComponent implements OnInit{

  id = ''
  assignment: any;

  constructor(private router: Router, private route: ActivatedRoute, private assignmentService: AssignmentStudentService) {
    this.id = this.route.snapshot.params['id']
  }

  ngOnInit() {
    this.loadAssignmentDetails();
  }

  loadAssignmentDetails() {
    this.assignmentService.getAssignmentDetails(this.id).subscribe((assignment) => {
      this.assignment = assignment;
      console.log(this.assignment);
    });
  }

  openFile(file: string) {
    window.open(`${environment.apiURL}/images/${file}`, '_blank');
  }

  listAssignment() {
      this.router.navigateByUrl('/home/assignmentStudent');
  }


  protected readonly environment = environment;
}
