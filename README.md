---

# Assignment Management Application

## Présentation

Cette application permet de gérer les assignments pour les étudiants et les professeurs. Les étudiants peuvent soumettre leurs assignments en sélectionnant le titre, la matière et en joignant un fichier si nécessaire. Les professeurs, agissant en tant qu'administrateurs, peuvent consulter ces assignments, les marquer comme rendus et leur attribuer une note et des remarques.

## Contribution

- **29 - RAMAROSON Sandy Princia** : Partie étudiant
- **31 - RAMIANDRISOA Rantonantenaina Steve** : Partie Professeur

## Installation

### Prérequis

- Node.js (dernière version) : [Télécharger Node.js](https://nodejs.org/en/download/package-manager)
- Angular CLI (version 17 ou ultérieure) : [Installer Angular CLI](https://angular.dev/tools/cli/setup-local)

### Backend

1. Cloner le projet backend :
    ```bash
    git clone https://github.com/Princia08/BackendAssignmentManagement
    ```
2. Accéder à la branche principale :
    ```bash
    git checkout main
    ```
3. Se rendre à la racine du répertoire :
    ```bash
    cd BackendAssignmentManagement
    ```
4. Ajouter un fichier `.env` avec le contenu suivant :
    ```env
    JWT_SECRET="hgfoigeajpvokvpoxgoptiosrpvixpodkfpw"
    ```
5. Enregistrer et lancer le serveur :
    ```bash
    node server.js
    ```

### Frontend

1. Cloner le projet frontend :
    ```bash
    git clone https://github.com/Princia08/AngularAssignmentsManagement
    ```
2. Accéder à la branche principale :
    ```bash
    git checkout main
    ```
3. Se rendre à la racine du répertoire :
    ```bash
    cd AngularAssignmentsManagement
    ```
4. Lancer l'application Angular :
    ```bash
    ng serve
    ```

## Authentification

### Identifiants de connexion

#### Admin/Professeurs :

- **Email :** amosse123@gmail.com
- **Mot de passe :** amosse123

#### Étudiants :

- **Email :** princiaram@gmail.com
- **Mot de passe :** princia123

## Fonctionnalités

### Inscription

- **Étudiant ou Professeur :** Inscription avec tous les champs obligatoires, sinon un message d'erreur s'affichera.
- **Activation du compte :** Un administrateur (professeur) doit vérifier et activer votre compte.

### Interface Étudiant

- **Profil :** Affichage des détails du profil avec photo, adresse email, date de naissance, nombre d'assignments et meilleure note.
- **Ajout d'un assignment :** Formulaire pour ajouter un nouvel assignment avec titre, matière et fichier (facultatif).
- **Liste des assignments :** Liste paginée des assignments avec détails et statut (rendu ou non, note attribuée).
- **Détails d'un assignment :** Page de détails avec photo de la matière, détails de l'assignment et fichier joint (si présent).

### Interface Professeur

- **Gestion des assignments :** Deux listes paginées : devoirs à noter et devoirs déjà notés.
- **Correction des devoirs :** Déplacement des devoirs de "à noter" vers "déjà noté" avec insertion de note et remarques.
- **Détails d'un devoir :** Page de détails avec photo de la matière, détails du devoir et fichier joint (si présent).

## Navigation (sidebar)

- **Menu Elève :** Accueil, nouvel assignment, liste des assignments, déconnexion.
- **Menu Professeur :** Accueil (liste assignment), gestion utilisateur, déconnexion.

Pour déconnecter et se reconnecter avec un autre compte, cliquer sur "déconnexion".

## Points Supplémentaires

### Vérification et Activation des Utilisateurs

- **Vérification/activation des utilisateurs inscrits par l'admin (un des professeurs)**
  - **Ajout de matière :** Assignation de matière pour le professeur qui vient de s'inscrire.
  - **Activation :** Activation des comptes des professeurs et des élèves.

### Fonctionnalités Interactives

- **Application interactive :**
  - **Loader :** Utilisation d'un loader pour les chargements de pages et de données.
  - **Ajout d'animations :** Intégration d'animations (ex : SVG, loader sous forme de livre) pour rendre l'application plus attrayante et engageante.
  - **Interface utilisateur améliorée :** Conception d'une interface intuitive et bien pensée pour rendre l'utilisation de l'application plus agréable.
  - **Bonne expérience utilisateur :** L'application est facile à utiliser et à naviguer, permettant aux utilisateurs d'accomplir leurs tâches plus rapidement et efficacement.
  - **Gestion des erreurs :** Les messages d'erreur sont détaillés et clairs (ex : email invalide, utilisateur non existant ou non activé, ajout d'une matière déjà existante).

### Fonctionnalités Avancées

- **Authentification avec token JWT :** Pour plus de sécurité.
- **Scroll infini :** Implémentation du scroll infini pour les assignments des professeurs.
- **Drag and drop :** Fonctionnalité de drag and drop pour soumettre un assignment.
- **Ajout de fichiers :** Les étudiants peuvent ajouter des fichiers à leurs assignments. Les professeurs peuvent visualiser ou télécharger ces fichiers.
- **Utilisation de guard :** Si l'utilisateur est déjà connecté, il ne pourra pas naviguer vers la page authentification. De même s'il ne s'est pas encore connecté, il ne pourra pas naviguer vers la page d'accueil.  


---
