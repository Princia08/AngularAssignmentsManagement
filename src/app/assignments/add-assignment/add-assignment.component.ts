import {Component, OnInit, Renderer2} from '@angular/core';
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
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
import {MatIcon} from "@angular/material/icon";
import {environment} from "../../../environments/environment.development";

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
    MatIcon,
    ReactiveFormsModule,
  ],
  templateUrl: './add-assignment.component.html',
  styleUrl: './add-assignment.component.css',
})
export class AddAssignmentComponent implements OnInit {
  listeMatiere: Matiere[] = [];
  user: User = new User();
  message: string = '';
  messageError: string = '';
  fileName!: string;
  url = environment.apiURL;

  // champs du formulaire
  assignmentForm = new FormGroup({
    nom: new FormControl('', [Validators.required]),
    idMatiere: new FormControl('', [Validators.required]),
    file: new FormControl('', [Validators.required]),
    dateDeRendu: new FormControl(new Date()),
    rendu: new FormControl(false),
    remarque: new FormControl(''),
    idUser: new FormControl('')
})

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


  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    if (file) {
      this.fileName = file.name;
      const formData = new FormData();
      formData.append("image", file, file.name);
      const upload$ = this.http.post(this.url+"/api/upload", formData);
      upload$.subscribe( () => {
        this.assignmentForm.patchValue({file: this.fileName})
      } );
    }
  }

  addAssignment() {
    this.message = '';
    this.messageError = '';

    if (this.assignmentForm.invalid) {
      this.messageError = 'Veuillez renseigner tous les champs';
      return;
    }

    this.assignmentForm.patchValue({idUser: this.user._id})
    this.assignmentsService
      .addAssignment(this.assignmentForm.value)
      .subscribe((response) => {
        this.message = response.message;
        this.router.navigate(['/home/add']);
      });

    this.assignmentForm.reset();
  }
}
