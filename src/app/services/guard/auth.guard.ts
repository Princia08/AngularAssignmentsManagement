import {CanActivateFn, Router} from '@angular/router';
import {inject} from "@angular/core";

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);

  // si l'user s'est déjà connecté,
  // il est redirigé vers la page d'accueil
  if(localStorage.getItem('token')) {
    router.navigateByUrl("/home")
    return false;
  }
  else {
    // si l'user ne s'est pas encore connecté,
    // il est authorisé à entrer dans la page d'athentification
    return true;
  }
};
