import {Component, OnInit} from '@angular/core';
import { RiveModule } from 'ng-rive';
import { interval } from "rxjs";
import { CommonModule } from "@angular/common";
import { FormGroup, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { UserService } from "../services/user/user.service";
import { User } from "../models/user.model";
import { AuthService } from "../services/auth/auth.service";

@Component({
  selector: 'app-authentification',
  standalone: true,
  imports: [
    RiveModule,
    CommonModule,
    ReactiveFormsModule,
  ],
  providers: [User],
  templateUrl: './authentification.component.html',
  styleUrl: './authentification.component.css'
})
export class AuthentificationComponent implements OnInit{
  constructor(private userService : UserService, private authService: AuthService) { }

  loader = true;
  private _interval = interval(500)
  private sub = this._interval.subscribe(() => {
    this.loader = false;
  })

  userForm = new FormGroup({
    mail: new FormControl(''),
    password: new FormControl('')
  })

  errorMessage = ""
  ngOnInit() {

  }

  login() {
    this.userService.authentification(this.userForm.value).subscribe({
      next: res => this.authService.logIn(res),
      error: err => this.errorMessage = err.error
    })
  }
}
