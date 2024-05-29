import {Component, OnInit} from '@angular/core';
import {CommonModule} from "@angular/common";
import {FormGroup, FormControl, ReactiveFormsModule, Validators} from '@angular/forms';
import {UserService} from "../services/user/user.service";
import {User} from "../models/user.model";
import {AuthService} from "../services/auth/auth.service";
import {RouterOutlet} from "@angular/router";
import {AnimationOptions, LottieComponent} from "ngx-lottie";
import {AnimationItem} from "lottie-web";

import { RiveModule } from 'ng-rive';

@Component({
  selector: 'app-authentification',
  standalone: true,
  imports: [
    RiveModule,
    CommonModule,
    ReactiveFormsModule,
    RouterOutlet,
    LottieComponent
  ],
  providers: [User],
  templateUrl: './authentification.component.html',
  styleUrl: './authentification.component.css',
})

export class AuthentificationComponent implements OnInit{

  userForm = new FormGroup({
    mail: new FormControl(''),
    password: new FormControl(''),
  });

  errorMessage = ""

  options: AnimationOptions = {
    path: '/assets/books-animation.json',
  };

  private loadTimeout: any;
  private animationTimeout: any;

  constructor(private userService: UserService, private authService: AuthService) {
  }

  ngOnInit() {
    this.loadTimeout = setTimeout(() => {
      this.showAnimation();
      this.animationTimeout = setTimeout(() => {
        this.hideAnimation();
      }, 2000);
    }, 0);
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


  login() {
    this.showAnimation();
    this.userService.authentification(this.userForm.value).subscribe({
      next: res => {
        this.authService.logIn(res)
        this.hideAnimation()
      },
      error: err => this.errorMessage = err.error
    })
  }
}
