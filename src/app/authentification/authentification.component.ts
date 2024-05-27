import {Component, OnInit} from '@angular/core';
import { interval } from "rxjs";
import { CommonModule } from "@angular/common";
import { FormGroup, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { UserService } from "../services/user/user.service";
import { User } from "../models/user.model";
import { AuthService } from "../services/auth/auth.service";
import {RouterOutlet} from "@angular/router";

@Component({
  selector: 'app-authentification',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterOutlet
  ],
  providers: [User],
  templateUrl: './authentification.component.html',
  styleUrl: './authentification.component.css'
})
export class AuthentificationComponent implements OnInit{

  userForm = new FormGroup({
    mail: new FormControl(''),
    password: new FormControl('')
  })

  errorMessage = ""

  constructor(private userService : UserService, private authService: AuthService) { }
  ngOnInit() {

  }

  login() {
    this.userService.authentification(this.userForm.value).subscribe({
      next: res => this.authService.logIn(res),
      error: err => this.errorMessage = err.error
    })
  }
}
