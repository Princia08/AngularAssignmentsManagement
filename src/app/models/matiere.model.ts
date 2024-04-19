export class Matiere {
  _id?: string;
  nom!: string;
  prof!: {
    _id: string;
    nom: string;
    prenom: string;
    image: string;
  };
  image!: string;
}
