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

// C'est mieux d'utiliser une Promise car souvent
// la fonction qui vérifie a besoin de faire une requête
// à un serveur pour vérifier si l'utilisateur est bien
// autorisé à accéder à la page. C'est ASYNCHRONE !
// Donc la bonne pratique est d'implémenter isAdmin ou isLogged
// comme une promesse qui renvoie un booléen.
// return authService.isAdmin()
//   .then(admin => {
//       if (admin) {
//         console.log("GUARD: Navigation autorisée");
//         return true;
//       } else {
//         console.log("GUARD: Navigation NON autorisée");
//         router.navigate(['/home']);
//         return false;
//       }
//     }
//   );
};
