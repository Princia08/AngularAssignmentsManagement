import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { provideNativeDateAdapter } from '@angular/material/core';

import { Assignment } from '../assignment.model';
import { AssignmentsService } from '../../services/assignment/assignments.service';
import { Router } from '@angular/router';
import { MatiereService } from '../../services/matieres/matiere.service';
import { Matiere } from '../../models/matiere.model';
import { UserService } from '../../services/user/user.service';
import { User } from '../../models/user.model';

@Component({
  selector: 'app-add-assignment',
  standalone: true,
  providers: [provideNativeDateAdapter()],
  imports: [
    FormsModule,
    MatInputModule,
    MatFormFieldModule,
    MatDatepickerModule,
    MatButtonModule,
  ],
  templateUrl: './add-assignment.component.html',
  styleUrl: './add-assignment.component.css',
})
export class AddAssignmentComponent implements OnInit {
  // champs du formulaire
  nomAssignment = '';
  dateDeRendu = undefined;
  listeMatiere: Matiere[] = [];
  assignement: Assignment = new Assignment();
  matiere_id: string = '';
  user: User = new User();

  constructor(
    private assignmentsService: AssignmentsService,
    private matiereService: MatiereService,
    private userService: UserService,
    private router: Router
  ) {}

  onSubmit(event: any) {
    if (this.nomAssignment == '' || this.dateDeRendu === undefined) return;

    // on crée un nouvel assignment
    let nouvelAssignment = new Assignment();
    // on genere un id aléatoire (plus tard ce sera fait coté serveur par
    // une base de données)
    nouvelAssignment.nom = this.nomAssignment;
    nouvelAssignment.dateDeRendu = this.dateDeRendu;
    nouvelAssignment.rendu = false;
    nouvelAssignment.idUser = this.user._id ?? '';
    nouvelAssignment.idMatiere = this.matiere_id;
    nouvelAssignment.remarque = '';
    nouvelAssignment.file = '';
    console.log(nouvelAssignment);
    // on utilise le service pour directement ajouter
    // le nouvel assignment dans le tableau
    this.assignmentsService
      .addAssignment(nouvelAssignment)
      .subscribe((reponse) => {
        console.log(reponse);
        // On navigue pour afficher la liste des assignments
        // en utilisant le router de manière programmatique
        this.router.navigate(['/home']);
      });
  }

  async ngOnInit() {
    console.log('ngOnInit assignments, appelée AVANT affichage du composant');
    this.userService.getUser().subscribe((user) => {
      this.user = user;
    });

    this.matiereService.getAllMatieres().subscribe(
      (matieres: Matiere[]) => {
        this.listeMatiere = matieres;
      },
      (error) => {
        console.error('Error fetching matieres:', error);
      }
    );
  }
}
