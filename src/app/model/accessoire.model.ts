import { Marque } from "./marque.model";
import { Image } from "./image.model";

export class Accessoire {
    idAccessoire! : number;
    libAccessoire! : string;
    prixAccessoire? : number;
    dateCreation? : Date ;
    marque! : Marque;
    image! : Image
    imageStr!:string
    images!: Image[];
    }
    