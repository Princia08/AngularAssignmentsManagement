Ceci est une application qui permet de gérer les assignments tel que:
Les étudiants peuvent y déposer leur assignment en choisissant le titre du devoir, la matière, le fichier à joindre s’il y en a.
Ainsi, les profs en tant qu’admin peuvent apercevoir ces assignments, les marquer comme rendu et leur attribuer une note, remarque.

Pour faire marcher le projet dans votre machine, vous devez tout d’abord:
-installer node la dernière version : https://nodejs.org/en/download/package-manager
-installer angular 17 ou ultérieur : https://angular.dev/tools/cli/setup-local
-cloner le projet back end via l’url : https://github.com/Princia08/BackendAssignmentManagement
aller dans la branche main
aller dans la racine du répertoire
ajouter le fichier .env et mettre: JWT_SECRET="hgfoigeajpvokvpoxgoptiosrpvixpodkfpw"
enregistrer puis lancer la commande : node server.js

-cloner le projet front end via l’url : https://github.com/Princia08/AngularAssignmentsManagement
aller dans la branche main
aller dans la racine du répertoire
lancer la commande : ng serve

####

les logins

-admin/prof:

gregorygally@gmail.com
gregory123

amosse123@gmail.com
amosse123

-etudiants

princiaram@gmail.com
princia123

###

Voici les fonctionnalités que vous verrez:

Inscription:
Vous vous inscrivez en tant qu’élève ou professeur
Vous devez remplir tous les champs sinon un message d’erreur s’affichera
Votre compte sera bien créé mais n’est pas encore activé

L’admin (un des professeur) devrait vérifier vos informations et activer ensuite votre compte:
-si vous êtes élève, un pop up avec un message de confirmation sera présenté et ensuite un bouton “activer”
-si vous êtes professeur, on vous assignera à une nouvelle matière (on suppose ici que c’est une matière par professeur) donc l’admin ajoutera une nouvelle matière en ajoutant le nom et la photo de la matière
Un message d’erreur est présenté si la matière existe déjà

Une fois activé, vous pouvez maintenant vous connecter.

En tant qu’élève :
Vous auriez une page de votre profil affichant les détails sur votre profil tel que votre photo, votre adresse email, date de naissance, ainsi que le nombre de vos assignments et la meilleure note que vous avez eu depuis.

Vous avez ensuite deux boutons :
L’un pour ajouter de nouvel assignment et l’autre pour voir la liste de vos assignments

Page ajout assignment :
-Nom de l’assignment
-la matière correspondant
-un fichier à joindre (facultatif)

Page liste assignments:
Liste paginer des assignments présentés sous forme de card affichant :
-une photo du professeur en haut à droite (vous verrez le nom du professeur en faisant passer votre curseur sur cette photo)
-une photo de la matière
-le titre de l’assignment
-une paragraphe qui dit que votre assignment n’a pas encore été rendu ou, dans le cas contraire: une note sur 20 et la date à laquelle l’assignment a été rendu

En cliquant sur l’un des assignments vous atterrissez sur une page de détails de l’assignment sur laquelle vous y verrez:
-une photo de la matière
-détails de l’assignment
-le fichier joint (si il y en a) qu’on pourrait visualiser ou téléchargé

Dans le sidebar à gauche vous avez le
menu :
accueil, nouvel assignment, liste assignment, déconnexion
Cliquer sur déconnecté pour sur connecter à un autre compte

En tant que professeur (admin/prof):
Vous aurez une page affichant deux listes paginer:
-À gauche, la liste des devoirs à noter.
-À droite, la liste des devoirs déjà notés.

Les deux listes seront présentées sous forme de cartes. Chaque carte présentera les informations suivantes :
-Titre du devoir
-Image de la matière
-Date de rendu
-Fichier joint (s'il y en a), que l'on peut visualiser ou télécharger
-Note donnée (uniquement pour les devoirs déjà notés, à droite)

Pour corriger un devoir, vous devez déplacer le devoir que vous voulez corriger de "à noter" vers "déjà noté". Une fenêtre apparaîtra pour insérer une note et des remarques.

En cliquant sur le titre du devoir, vous accéderez à une page de détails du devoir, où vous verrez :
-Une photo de la matière
-Les détails du devoir
-Le fichier joint (s'il y en a), que l'on peut visualiser ou télécharger
