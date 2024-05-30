import {CanActivateFn, Router} from '@angular/router';
import {inject} from "@angular/core";
import {AuthService} from "../auth/auth.service";

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const authService = inject(AuthService);

  // si l'user s'est déjà connecté,
  // il est redirigé vers la page d'accueil
  if(localStorage.getItem('token')) {
    authService.isAdmin().then((result) => {
       if(!result) {
         router.navigateByUrl("/home/student")
       }
       else {
         router.navigateByUrl("/home/assignment")
       }
    })
    return false;
  }
  else {
    // si l'user ne s'est pas encore connecté,
    // il est authorisé à entrer dans la page d'athentification
    return true;
  }
};
