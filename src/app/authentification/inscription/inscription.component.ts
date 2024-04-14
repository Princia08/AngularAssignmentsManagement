import { Component } from '@angular/core';
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule} from "@angular/forms";

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

  userForm = new FormGroup({
    nom: new FormControl(''),
    prenom: new FormControl(''),
    dateDeNaissance: new FormControl(''),
    mail: new FormControl(''),
    password: new FormControl(''),
    image: new FormControl(''),
    type: new FormControl(0),
    isActivate: new FormControl(false),
    isAdmin: new FormControl(false)
  })

  errorMessage = ""

  signup() {
    console.log(this.userForm.value);
  }
}
