import {Component, OnInit, ViewChild} from '@angular/core';
import {MatIcon} from "@angular/material/icon";
import {MatIconButton} from "@angular/material/button";
import {MatListItem, MatNavList} from "@angular/material/list";
import {MatSidenav, MatSidenavContainer, MatSidenavContent} from "@angular/material/sidenav";
import {Router, RouterLink, RouterOutlet} from "@angular/router";
import {AuthService} from "../services/auth/auth.service";
import {AssignmentsService} from "../services/assignment/assignments.service";
import {BreakpointObserver} from "@angular/cdk/layout";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    MatIcon,
    MatIconButton,
    MatListItem,
    MatNavList,
    MatSidenav,
    MatSidenavContainer,
    MatSidenavContent,
    RouterLink,
    RouterOutlet
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
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
