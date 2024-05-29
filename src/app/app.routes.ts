import { Routes } from '@angular/router';
import { AssignmentDetailComponent } from './assignments/assignment-detail/assignment-detail.component';
import { EditAssignmentComponent } from './assignments/edit-assignment/edit-assignment.component';
import { AuthentificationComponent } from './authentification/authentification.component';
import { homeGuard } from './services/guard/home.guard';
import { authGuard } from './services/guard/auth.guard';
import { InscriptionComponent } from './authentification/inscription/inscription.component';
import { HomeComponent } from './home/home.component';
import {UserComponent} from "./user/user.component";
import {AddAssignmentComponent} from "./assignments/add-assignment/add-assignment.component";
import {StudentsComponent} from "./students/students.component";
import {AssignmentsComponent} from "./assignments/assignments.component";
import {AssignmentStudentComponent} from "./students/assignment-student/assignment-student.component";
import {AssignmentStudentDetailsComponent} from "./students/assignment-student-details/assignment-student-details.component";

import { AssignmentListeComponent } from './assignments/dragAndDrop/assignment-liste/assignment-liste.component';

export const routes: Routes = [
  { path: '', redirectTo: '/authentification', pathMatch: 'full' },
  {
    path: 'authentification',
    component: AuthentificationComponent,
    canActivate: [authGuard],
  },
  { path: 'signup', component: InscriptionComponent },
  {
    path: 'home',
    component: HomeComponent,
    canActivate: [homeGuard],
    children: [
      {
        path: 'student',
        component: StudentsComponent,
        data: {isSidebarOpen: true}
      },
      {
        path: 'user',
        component: UserComponent,
        data: { isSidebarOpen: true },
      },
      {
        path: 'add',
        component: AddAssignmentComponent,

        data: {isSidebarOpen: true}
      },
      {
        path: 'assignment',
        component: AssignmentsComponent,
        data: {isSidebarOpen: true}
      },
      {
        path: 'assignmentStudent',
        component: AssignmentStudentComponent,
        data: {isSidebarOpen: true}
      },
      {
        path: 'assignmentStudent/details/:id',
        component: AssignmentStudentDetailsComponent,
        data: {isSidebarOpen: true}
      }
    ]

  },

  // { path: 'assignment/:id', component: AssignmentDetailComponent },
  {
    path: 'assignment/:id/edit',
    component: EditAssignmentComponent,
    canActivate: [homeGuard],
  },
  { path: 'assignments', component: AssignmentsComponent },
  { path: 'assignmentsDragDrop', component: AssignmentListeComponent },
];

