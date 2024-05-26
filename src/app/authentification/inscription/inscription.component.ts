import {Component} from '@angular/core';
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {UserService} from "../../services/user/user.service";
import {Router} from "@angular/router";
import {MatIcon} from "@angular/material/icon";
import {HttpClient} from "@angular/common/http";
import {MatMiniFabButton} from "@angular/material/button";
import {environment} from "../../../environments/environment.development";

@Component({
  selector: 'app-inscription',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    MatIcon,
    MatMiniFabButton
  ],
  templateUrl: './inscription.component.html',
  styleUrl: './inscription.component.css'
})
export class InscriptionComponent {

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

  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    if (file) {
      this.fileName = file.name;
      const formData = new FormData();
      formData.append("image", file, file.name);
      const upload$ = this.http.post(this.url+"/api/upload", formData);
      upload$.subscribe();
    }
  }

  signup() {
    if (this.userForm.valid) {
      this.userForm.patchValue({image: this.fileName})
      this.userService.signup(this.userForm.value).subscribe({
        next: () => this.router.navigateByUrl('/'),
        error: err => this.errorMessage = err.error
      })
    } else this.errorMessage = "Veuillez remplir tous les champs obligatoires"
  }
}
