import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {environment} from "../../../environments/environment";
import {DatePipe} from "@angular/common";
import {MatIcon} from "@angular/material/icon";
import {AssignmentStudentService} from "../../services/student/assignment-student.service";
import {AnimationOptions, LottieComponent} from "ngx-lottie";
import {AnimationItem} from "lottie-web";
import {AuthService} from "../../services/auth/auth.service";
import {AssignmentsService} from "../../services/assignment/assignments.service";
import {error} from "@angular/compiler-cli/src/transformers/util";

@Component({
  selector: 'app-assignment-student-details',
  standalone: true,
  imports: [
    DatePipe,
    MatIcon,
    LottieComponent
  ],
  templateUrl: './assignment-student-details.component.html',
  styleUrl: './assignment-student-details.component.css'
})
export class AssignmentStudentDetailsComponent implements OnInit {

  id = ''
  assignment!: any;
  isAdmin= false;
  message = '';

  protected readonly environment = environment;

  options: AnimationOptions = {
    path: '/assets/books-animation.json',
  };

  constructor(private router: Router,private authService: AuthService, private route: ActivatedRoute, private assignmentService: AssignmentStudentService) {
    this.id = this.route.snapshot.params['id']
  }

  ngOnInit() {
    this.loadAssignmentDetails();
    this.authService.isAdmin().then((result) => {
      this.isAdmin = result;
    });
    this.message = '';
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

  loadAssignmentDetails() {
    this.showAnimation()
    this.assignmentService.getAssignmentDetails(this.id).subscribe((assignment) => {
      this.assignment = assignment;
      this.hideAnimation();
    });
  }

  openFile(file: string) {
    window.open(`${environment.apiURL}/images/${file}`, '_blank');
  }

  listAssignment() {
    this.router.navigateByUrl('/home/assignmentStudent');
  }

  listAssignmentProf() {
    this.router.navigateByUrl('/home/assignment');
  }

  delete() {
    this.showAnimation()
    this.assignmentService.deleteAssignment(this.id).subscribe({
      next: res => {
        this.message = this.assignment.nom + ' a été supprimé';
        this.hideAnimation();
      },
      error: err => {
        this.hideAnimation();
      }
    });
  }
}
