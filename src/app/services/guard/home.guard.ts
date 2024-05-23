import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../auth/auth.service';

export const homeGuard: CanActivateFn = async (route, state) => {

  // injection du service d'authentification
  const authService = inject(AuthService);
  // injection du router
  const router = inject(Router);

  // lorsque l'user se connecte, on vérifie le token du localStorage
  if(localStorage.getItem('token')) {
    let admin =await authService.isAdmin()
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
