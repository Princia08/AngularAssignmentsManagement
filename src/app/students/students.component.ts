import {Component, OnInit} from '@angular/core';
import {environment} from "../../environments/environment.development";
import {UserService} from "../services/user/user.service";
import {User} from "../models/user.model";
import {DatePipe} from "@angular/common";

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

  constructor(private userService: UserService) {
  }

  ngOnInit() {
    this.loadMyInfo();
  }

  loadMyInfo() {
    this.userService.getUser().subscribe((user) => {
      this.user = user;
      this.urlPicture= environment.apiURL + "/images/" + this.user?.image;
    });
  }
}
