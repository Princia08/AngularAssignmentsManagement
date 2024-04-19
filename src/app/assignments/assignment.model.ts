export class Assignment {
  _id?: string;
  nom!: string;
  dateDeRendu!: Date;
  rendu!: boolean;
  file!: string;
  idMatiere!: string;
  idUser!: string;
  remarque!: string;
  note!: number;
}
