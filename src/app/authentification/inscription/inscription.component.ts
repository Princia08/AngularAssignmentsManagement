import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {UserService} from "../../services/user/user.service";
import {Router} from "@angular/router";
import {MatIcon} from "@angular/material/icon";
import {HttpClient} from "@angular/common/http";
import {MatMiniFabButton} from "@angular/material/button";
import {environment} from "../../../environments/environment.development";
import {AnimationOptions, LottieComponent} from "ngx-lottie";
import {AnimationItem} from "lottie-web";

@Component({
  selector: 'app-inscription',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    MatIcon,
    MatMiniFabButton,
    LottieComponent
  ],
  templateUrl: './inscription.component.html',
  styleUrl: './inscription.component.css'
})
export class InscriptionComponent implements OnInit {

  constructor(private userService: UserService, private router: Router, private http: HttpClient) {
  }

  userForm = new FormGroup({
    nom: new FormControl('', [Validators.required]),
    prenom: new FormControl('', [Validators.required]),
    dateDeNaissance: new FormControl('', [Validators.required]),
    mail: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required]),
    image: new FormControl(''),
    type: new FormControl(0),
    isActivate: new FormControl(false),
    isAdmin: new FormControl(false)
  })

  errorMessage = ""
  fileName!: string;
  url = environment.apiURL;

  options: AnimationOptions = {
    path: '/assets/books-animation.json',
  };

  ngOnInit() {
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

  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    if (file) {
      this.fileName = file.name;
      const formData = new FormData();
      formData.append("image", file, file.name);
      const upload$ = this.http.post(this.url + "/upload", formData);
      upload$.subscribe();
    }
  }

  signup() {
    if (this.userForm.valid) {
      this.showAnimation()
      this.userForm.patchValue({image: this.fileName})
      this.userService.signup(this.userForm.value).subscribe({
        next: res => this.router.navigateByUrl('/'),
        error: err => this.errorMessage = err.error,
        complete: () => this.hideAnimation()
      })
    } else this.errorMessage = "Veuillez remplir tous les champs obligatoires"
  }
}
