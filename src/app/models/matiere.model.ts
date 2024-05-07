import {User} from "./user.model";

export class Matiere {
  _id?: string;
  nom!: string;
  prof?: User;
  image!: string;
}
