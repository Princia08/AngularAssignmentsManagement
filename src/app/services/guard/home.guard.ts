import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const homeGuard: CanActivateFn = async (route, state) => {
  // injection du router
  const router = inject(Router);

  // lorsque l'user se connecte, on vérifie le token du localStorage
  if(localStorage.getItem('token')) {
      return true;
  }
  else {
    // si l'user tente d'entrer dans la page home,
    // il sera redirigé vers la page d'authentification
    router.navigate(['/']);
    // il n'est pas autorisé car il n'y a pas de token
    return false;
  }
};
