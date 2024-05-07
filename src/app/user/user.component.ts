import {Component, OnInit} from '@angular/core';
import {UserService} from "../services/user/user.service";
import {User} from "../models/user.model";
import {NgStyle} from "@angular/common";
import {MatiereService} from "../services/matieres/matiere.service";
import {Matiere} from "../models/matiere.model";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatIcon} from "@angular/material/icon";
import {MatMiniFabButton} from "@angular/material/button";
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'app-user',
  standalone: true,
  imports: [
    NgStyle,
    FormsModule,
    ReactiveFormsModule,
    MatIcon,
    MatMiniFabButton
  ],
  templateUrl: './user.component.html',
  styleUrl: './user.component.css'
})

export class UserComponent implements OnInit{

  constructor(private userService: UserService, private matiereService: MatiereService, private http: HttpClient) {
  }

  listInactivatedUsers: User[] = []
  user?: User
  nomMatiere = "";
  imageMatiere = "";
  displayStyleEleve = "none";
  displayStyleProf = "none";
  message = "";
  messagePopupProf = "";
  ngOnInit(): void {
    this.loadInactivatedUsers();
  }
  loadInactivatedUsers() {
    // get all users
    this.userService.getAllInactivatedUsers().subscribe((user) => {
      this.listInactivatedUsers = user;
    });
  }
  openPopupEleve(user: User) {
    this.user = user
    this.displayStyleEleve = "block";
  }
  closePopupEleve() {
    this.displayStyleEleve = "none";
  }
  openPopupProf(user: User) {
    this.user = user
    this.displayStyleProf = "block";
  }
  closePopupProf() {
    this.displayStyleProf = "none";
  }
  activerEleve() {
    this.user!.isActivate = true;
    this.userService.updateUser(this.user).subscribe((user) => {
        this.message = "L'élève "+ this.user!.nom +" a été activé(e) avec succès!";
        this.loadInactivatedUsers();
        this.displayStyleEleve = "none";
    })
  }
  activerProf() {
    if (this.nomMatiere && this.imageMatiere) {
      this.user!.isActivate = true;
      this.user!.isAdmin = true;
      this.userService.updateUser(this.user).subscribe((user) => {
        var matiere = new Matiere();
        matiere.nom = this.nomMatiere;
        matiere.image = "matiere.jpg";
        matiere.prof = this.user;
        this.matiereService.addMatiere(matiere).subscribe();
        this.message = this.user!.prenom + " " + this.user!.nom + " a été activé avec succès en tant que prof/admin et assigné(e) à la matière " + this.nomMatiere + "!";
        this.loadInactivatedUsers();
        this.displayStyleProf = "none";
      })
    }
    else {
      this.messagePopupProf = "Veuillez remplir tous les champs!";
    }
  }

  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    if (file) {
      this.imageMatiere = file.name;
      const formData = new FormData();
      formData.append("image", file, file.name);
      const upload$ = this.http.post("http://localhost:8010/api/upload", formData);
      upload$.subscribe();
    }
  }
}
