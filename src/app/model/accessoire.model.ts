import { Marque } from "./marque.model";

export class Accessoire {
    idAccessoire! : number;
    libAccessoire! : string;
    prixAccessoire? : number;
    dateCreation? : Date ;
    marque! : Marque;
    }
    