import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {environment} from "../../../environments/environment.development";
import {DatePipe} from "@angular/common";
import {MatIcon} from "@angular/material/icon";
import {AssignmentStudentService} from "../../services/student/assignment-student.service";
import {AnimationOptions, LottieComponent} from "ngx-lottie";
import {AnimationItem} from "lottie-web";

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
  protected readonly environment = environment;

  options: AnimationOptions = {
    path: '/assets/books-animation.json',
  };

  constructor(private router: Router, private route: ActivatedRoute, private assignmentService: AssignmentStudentService) {
    this.id = this.route.snapshot.params['id']
  }

  ngOnInit() {
    this.loadAssignmentDetails();
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
}
