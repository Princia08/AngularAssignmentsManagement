import {Injectable} from '@angular/core';
import {Router} from "@angular/router";
import {UserService} from "../user/user.service";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private router: Router, private userService: UserService) {
  }

  // propriété pour savoir si l'utilisateur est connecté
  loggedIn = false;

  logIn(token: string) {
    // on stock le token dans le localStorage du header
    localStorage.setItem('token', token)
    this.router.navigateByUrl('/home')
    this.loggedIn = true;
  }

  logOut() {
    // on retire le token du localStorage du header
    localStorage.removeItem('token')
    this.router.navigateByUrl('/')
    this.loggedIn = false;
  }

  // methode qui indique si on est connecté en tant qu'admin ou pas
  //
  // si on l'utilisait à la main dans un composant, on ferait:
  // this.authService.isAdmin().then(....) ou
  // admin = await this.authService.isAdmin()
  isAdmin(): Promise<boolean> {
    return new Promise((resolve, reject) => {
      this.userService.getUser().subscribe({
        next: (user) => {
          // resolve(user.isAdmin && this.loggedIn)
          resolve(user.isAdmin)
        },
        error: (err) => reject(err)
      });
    });
  }
}

