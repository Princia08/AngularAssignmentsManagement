import { Routes } from '@angular/router';
import { AssignmentsComponent } from './assignments/assignments.component';
import { AddAssignmentComponent } from './assignments/add-assignment/add-assignment.component';
import { AssignmentDetailComponent } from './assignments/assignment-detail/assignment-detail.component';
import { EditAssignmentComponent } from './assignments/edit-assignment/edit-assignment.component';
import {AuthentificationComponent} from "./authentification/authentification.component";
import { homeGuard } from './services/guard/home.guard';
import {authGuard} from "./services/guard/auth.guard";

export const routes: Routes = [
  { path: '', redirectTo: '/authentification', pathMatch: 'full' },
  { path: 'authentification', component: AuthentificationComponent, canActivate:[authGuard] },
  { path: 'home', component: AssignmentsComponent, canActivate:[homeGuard] },
  { path: "add", component: AddAssignmentComponent },
  { path: "assignment/:id", component: AssignmentDetailComponent},
  {
    path: "assignment/:id/edit", component: EditAssignmentComponent, canActivate: [homeGuard]
  }
];
