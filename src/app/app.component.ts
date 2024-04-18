import { Component, OnInit } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { AssignmentsComponent } from './assignments/assignments.component';
import { MatSidenav, MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatListModule } from '@angular/material/list';
import { BreakpointObserver } from '@angular/cdk/layout';
import { ViewChild } from '@angular/core';
import { AuthService } from './services/auth/auth.service';
import { AssignmentsService } from './services/assignment/assignments.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    RouterLink,
    MatButtonModule,
    MatDividerModule,
    MatIconModule,
    MatSlideToggleModule,
    MatSidenavModule,
    AssignmentsComponent,
    MatToolbarModule,
    MatListModule,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements OnInit {
  title = 'Application de gestion des assignments';
  @ViewChild(MatSidenav)
  sidenav!: MatSidenav;

  isMobile = true;
  isCollapsed = true;
  isSidebarOpen = false;
  sidebarWidth = '200px';

  constructor(
    private authService: AuthService,
    private assignmentsService: AssignmentsService,
    private router: Router,
    private observer: BreakpointObserver
  ) {}


  genererDonneesDeTest() {
    // on utilise le service
    /* VERSION NAIVE
    this.assignmentsService.peuplerBD();
    */

    // VERSION AVEC Observable
    this.assignmentsService.peuplerBDavecForkJoin().subscribe(() => {
      console.log(
        'Données générées, on rafraichit la page pour voir la liste à jour !'
      );
      window.location.reload();
      // On devrait pouvoir le faire avec le router, jussqu'à la version 16 ça fonctionnait avec
      // this.router.navigate(['/home'], {replaceUrl:true});
    });
  }
  ngOnInit() {
    this.observer.observe(['(max-width: 800px)']).subscribe((screenSize) => {
      if (screenSize.matches) {
        this.isMobile = true;
      } else {
        this.isMobile = false;
      }
    });
  }

  toggleMenu() {
    this.isSidebarOpen = !this.isSidebarOpen;
    if (this.isMobile) {
      this.sidenav.toggle();
      this.isCollapsed = false; // On mobile, the menu can never be collapsed
    } else {
      this.sidenav.open(); // On desktop/tablet, the menu can never be fully closed
      this.isCollapsed = !this.isCollapsed;
    }
  }
}
