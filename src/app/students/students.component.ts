import {Component, OnInit} from '@angular/core';
import {environment} from "../../environments/environment.development";
import {UserService} from "../services/user/user.service";
import {User} from "../models/user.model";
import {DatePipe} from "@angular/common";
import {Router} from "@angular/router";
import {AssignmentStudentService} from "../services/student/assignment-student.service";

@Component({
  selector: 'app-students',
  standalone: true,
  imports: [
    DatePipe
  ],
  templateUrl: './students.component.html',
  styleUrl: './students.component.css'
})
export class StudentsComponent implements OnInit {
  urlPicture !: string;
  user?: User;
  numberAssignment = 0;
  maxNote = 0;

  constructor(private router: Router, private userService: UserService, private assignmentService : AssignmentStudentService) {
  }

  ngOnInit() {
    this.loadMyInfo();
    this.loadMyAssignment();
  }

  loadMyInfo() {
    this.userService.getUser().subscribe((user) => {
      this.user = user;
      this.urlPicture= environment.apiURL + "/images/" + this.user?.image;
    });
  }

  loadMyAssignment() {
    this.assignmentService.getAssignmentForNote().subscribe((assignment) => {
      this.numberAssignment = assignment.length;

      // get the maximum note
      const notes = assignment
        .map(assignment => assignment.note)
        .filter(note => note !== undefined);
      this.maxNote = Math.max(...notes);
    });

  }

  addAssignment() {
    this.router.navigateByUrl('/home/add')
  }

  listeAssignment() {
    this.router.navigateByUrl('/home/assignmentStudent')
  }

}
