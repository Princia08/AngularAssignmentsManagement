import {Component, OnInit, Renderer2} from '@angular/core';
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
import {HttpClient} from "@angular/common/http";

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
  message: string = '';
  messageError: string = '';

  constructor(
    private renderer: Renderer2, private http : HttpClient,
    private assignmentsService: AssignmentsService, private matiereService: MatiereService, private userService: UserService, private router: Router) {
  }

  async ngOnInit() {
    this.loadSvg();
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
    this.message = '';
    this.messageError = '';
  }

  private loadSvg() {
    let svgUrl = "assets/student.svg"
    this.http.get(svgUrl, { responseType: 'text' }).subscribe(svgContent => {
      const svgContainer = this.renderer.selectRootElement('#svgContainer', true);
      svgContainer.innerHTML = ''; // Clear the container
      svgContainer.innerHTML = svgContent; // Insert the SVG content
      this.restartAnimation(svgContainer);
    });
  }

  // restart animation for svg when recharging page
  private restartAnimation(svgContainer: HTMLElement) {
    const svgElement = svgContainer.querySelector('svg');
    if (svgElement) {
      const clonedSvgElement = svgElement.cloneNode(true);
      svgContainer.removeChild(svgElement);
      svgContainer.appendChild(clonedSvgElement);
    }
  }

  onSubmit(event: any) {
    this.message = '';
    this.messageError = '';

    if (this.nomAssignment == '' || this.dateDeRendu === undefined) return;

    let nouvelAssignment = new Assignment();
    nouvelAssignment.nom = this.nomAssignment;
    nouvelAssignment.dateDeRendu = this.dateDeRendu;
    nouvelAssignment.rendu = false;
    nouvelAssignment.idUser = this.user._id ?? '';
    nouvelAssignment.idMatiere = this.matiere_id;
    nouvelAssignment.remarque = '';
    nouvelAssignment.file = '';

    if (nouvelAssignment.dateDeRendu > new Date()) {
      this.messageError = 'Veuillez choisir une date de rendu inférieure à la date actuelle.';
      return
    }

    this.assignmentsService
      .addAssignment(nouvelAssignment)
      .subscribe((response) => {
        this.message = response.message;
        this.router.navigate(['/home/add']);
      });
  }
}
