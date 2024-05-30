import { Component, Inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { provideNativeDateAdapter } from '@angular/material/core';
import { Assignment } from '../assignment.model';
import { AssignmentsService } from '../../services/assignment/assignments.service';
import {
  ReactiveFormsModule,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-edit-assignment',
  standalone: true,
  providers: [provideNativeDateAdapter()],
  imports: [
    FormsModule,
    MatInputModule,
    MatFormFieldModule,
    MatDatepickerModule,
    MatButtonModule,
  ],
  templateUrl: './edit-assignment.component.html',
  styleUrls: ['./edit-assignment.component.css'],
})
export class EditAssignmentComponent implements OnInit {
  assignment: Assignment;
  nomAssignment: string;
  dateDeRendu?: Date;
  remarque: string = '';
  note: number = -10;

  constructor(
    private assignmentsService: AssignmentsService,
    private dialogRef: MatDialogRef<EditAssignmentComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.assignment = data.assignment;
    this.nomAssignment = this.assignment.nom;
    this.dateDeRendu = this.assignment.dateDeRendu;
  }

  ngOnInit() {}

  onSaveAssignment() {
    if (this.note < 0 || this.note > 20) return;

    this.assignment.remarque = this.remarque;
    this.assignment.note = this.note;
    this.assignment.rendu = true;
    this.assignment.dateDeRendu = new Date();
    console.log(this.assignment);
    this.assignmentsService.updateAssignment(this.assignment).subscribe(
      (message) => {
        console.log(message);
        this.dialogRef.close(true); // close the dialog and return true
      },
      (error) => {
        console.error(error);
        this.dialogRef.close(false); // close the dialog and return false
      }
    );
  }

  onCancel() {
    this.dialogRef.close(false); // close the dialog without making changes
  }
}
