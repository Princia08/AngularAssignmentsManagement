import { Component } from '@angular/core';
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {UserService} from "../../services/user/user.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-inscription',
  standalone: true,
    imports: [
        FormsModule,
        ReactiveFormsModule
    ],
  templateUrl: './inscription.component.html',
  styleUrl: './inscription.component.css'
})
export class InscriptionComponent {

  constructor(private userService : UserService, private router: Router) { }

  userForm = new FormGroup({
    nom: new FormControl('', [Validators.required]),
    prenom: new FormControl('',[Validators.required]),
    dateDeNaissance: new FormControl('',[Validators.required]),
    mail: new FormControl('',[Validators.required]),
    password: new FormControl('',[Validators.required]),
    image: new FormControl(''),
    type: new FormControl(0),
    isActivate: new FormControl(false),
    isAdmin: new FormControl(false)
  })

  errorMessage = ""

  signup() {
    if(this.userForm.valid) {
      this.userService.signup(this.userForm.value).subscribe({
        next: () => this.router.navigateByUrl('/'),
        error: err => this.errorMessage = err.error
      })
    }
    else this.errorMessage = "Veuillez remplir tous les champs obligatoires"
  }
}
