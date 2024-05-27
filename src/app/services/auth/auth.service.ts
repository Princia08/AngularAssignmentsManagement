import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../user/user.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private router: Router, private userService: UserService) {}

  // propriété pour savoir si l'utilisateur est connecté
  loggedIn = false;

  logIn(token: string) {
    // on stock le token dans le localStorage du header
    localStorage.setItem('token', token);
    // localStorage.setItem('matiere',user.);
    this.router.navigateByUrl('/home');
    this.loggedIn = true;
  }

  logOut() {
    // on retire le token du localStorage du header
    localStorage.removeItem('token');
    this.router.navigateByUrl('/');
    this.loggedIn = false;
  }

  // methode qui indique si on est connecté en tant qu'admin ou pas
  // pour le moment, on est admin simplement si on est connecté
  // En fait cette méthode ne renvoie pas directement un booleén
  // mais une Promise qui va renvoyer un booléen (c'est imposé par
  // le système de securisation des routes de Angular)
  //
  // si on l'utilisait à la main dans un composant, on ferait:
  // this.authService.isAdmin().then(....) ou
  // admin = await this.authService.isAdmin()
  isAdmin(): Promise<boolean> {
    return new Promise((resolve, reject) => {
      // ici accès BD? Web Service ? etc...
      this.userService.getUser().subscribe({
        next: (user) => {
          // resolve(user.isAdmin && this.loggedIn)
          resolve(user.isAdmin);
        },
        error: (err) => reject(err),
      });
    });
  }
}
