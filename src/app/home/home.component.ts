import { Component, OnInit, ViewChild } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { MatIconButton } from '@angular/material/button';
import { MatListItem, MatNavList } from '@angular/material/list';
import {
  MatSidenav,
  MatSidenavContainer,
  MatSidenavContent,
} from '@angular/material/sidenav';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { AuthService } from '../services/auth/auth.service';
import { AssignmentsService } from '../services/assignment/assignments.service';
import { BreakpointObserver } from '@angular/cdk/layout';
import { ActivatedRoute } from '@angular/router';
import {AsyncPipe} from "@angular/common";
import {UserService} from "../services/user/user.service";

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
    RouterOutlet,
    AsyncPipe,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent implements OnInit {
  title = 'Application de gestion des assignments';
  @ViewChild(MatSidenav)
  sidenav!: MatSidenav;

  isMobile = true;
  isCollapsed = true;
  isSidebarOpen = false;
  isAdmin = false;
  sidebarWidth = '70px';

  constructor(
    private authService: AuthService,
    private userService: UserService,
    private assignmentsService: AssignmentsService,
    private router: Router,
    private observer: BreakpointObserver,
    private route: ActivatedRoute
  ) {}
  ngOnInit() {
    // Check if there's a saved state for the sidebar in localStorage
    const storedSidebarState = localStorage.getItem('isSidebarOpen');

    this.isSidebarOpen = storedSidebarState
      ? JSON.parse(storedSidebarState)
      : false;

    this.route.firstChild?.data.subscribe((data) => {
      // Set the isSidebarOpen state based on the parameter value
      this.isSidebarOpen = data?.['isSidebarOpen'] || false;
    });

    this.observer.observe(['(max-width: 800px)']).subscribe((screenSize) => {
      if (screenSize.matches) {
        this.isMobile = true;
      } else {
        this.isMobile = false;
      }
    });

    this.authService.isAdmin().then((result) => {
      console.log('isAdmin', result)
      this.isAdmin = result
    })
  }

  toggleMenu() {
    this.isSidebarOpen = !this.isSidebarOpen;
    if (this.isMobile) {
      this.sidenav.toggle();
      this.isCollapsed = true; // On mobile, the menu can never be collapsed
      //this.sidebarWidth = this.sidenav._getWidth().toString() + 'px';
    } else {
      this.sidenav.open(); // On desktop/tablet, the menu can never be fully closed
      this.isCollapsed = !this.isCollapsed;
    }

    // Save the state of the sidebar in localStorage
    localStorage.setItem('isSidebarOpen', JSON.stringify(this.isSidebarOpen));
  }
}
