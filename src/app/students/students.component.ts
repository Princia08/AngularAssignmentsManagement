import {Component, OnInit} from '@angular/core';
import {environment} from "../../environments/environment.development";
import {UserService} from "../services/user/user.service";
import {User} from "../models/user.model";
import {DatePipe} from "@angular/common";
import {Router} from "@angular/router";
import {AssignmentStudentService} from "../services/student/assignment-student.service";
import {AnimationOptions, LottieComponent} from "ngx-lottie";
import {AnimationItem} from "lottie-web";

@Component({
  selector: 'app-students',
  standalone: true,
  imports: [
    DatePipe,
    LottieComponent
  ],
  templateUrl: './students.component.html',
  styleUrl: './students.component.css'
})
export class StudentsComponent implements OnInit {
  urlPicture !: string;
  user?: User;
  numberAssignment = 0;
  maxNote = 0;
  minNote = 0;

  options: AnimationOptions = {
    path: '/assets/books-animation.json',
  };

  constructor(private router: Router, private userService: UserService, private assignmentService : AssignmentStudentService) {
  }

  ngOnInit() {
    this.loadMyInfo();
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

  loadMyInfo() {
    this.showAnimation();
    this.userService.getUser().subscribe((user) => {
      this.user = user;
      this.urlPicture= environment.apiURL + "/images/" + this.user?.image;
      this.hideAnimation();
    });
  }

  loadMyAssignment() {
    this.assignmentService.getAssignmentForNote().subscribe((assignment) => {
      this.numberAssignment = assignment.length;

      // get the maximum note
      const notes = assignment
        .map(assignment => assignment.note)
        .filter(note => note !== undefined && note !== 0);
      this.maxNote = Math.max(...notes);
      this.minNote = Math.min(...notes);

    });

  }

  addAssignment() {
    this.router.navigateByUrl('/home/add')
  }

  listeAssignment() {
    this.router.navigateByUrl('/home/assignmentStudent')
  }

}
