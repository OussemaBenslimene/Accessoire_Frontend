import { Injectable } from '@angular/core';
import { Accessoire } from '../model/accessoire.model';
import { Marque } from '../model/marque.model';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { MarqueWrapper } from '../model/marqueWrapped.model';
import { AuthService } from './auth.service';
import { Image } from '../model/image.model';
AuthService
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
};

@Injectable({
  providedIn: 'root',
})
export class AccessoireService {
  apiURL: string = 'http://localhost:8080/accessoire/api';
  apiURLMar: string = 'http://localhost:8080/accessoire/mar';

  /*marques: Marque[];

  accessoires: Accessoire[]; //table of strings*/
  accessoire!: Accessoire;

  constructor(private http: HttpClient, private authService: AuthService) {
    /*this.marques = [
      { idMar: 1, nomMar: 'Redragon' },
      { idMar: 2, nomMar: 'HyperX' },
      { idMar: 3, nomMar: 'Razer' },
    ];

    this.accessoires = [
      {
        idAccessoire: 1,
        libAccessoire: 'Souris Redragon',
        prixAccessoire: 300.0,
        dateCreation: new Date('01/14/2021'),
        marque: { idMar: 1, nomMar: 'Redragon' },
      },
      {
        idAccessoire: 2,
        libAccessoire: 'Ecran BenQ',
        prixAccessoire: 1000.0,
        dateCreation: new Date('01/14/2021'),
        marque: { idMar: 2, nomMar: 'HyperX' },
      },
      {
        idAccessoire: 2,
        libAccessoire: 'Casque Cloud II',
        prixAccessoire: 500.0,
        dateCreation: new Date('01/14/2021'),
        marque: { idMar: 3, nomMar: 'Razer' },
      },
    ];*/
  }

  listeAccessoires(): Observable<Accessoire[]> {
    /*let jwt = this.authService.getToken();
    jwt = "Bearer " + jwt;
    let httpHeaders = new HttpHeaders({ "Authorization": jwt })

    return this.http.get<Accessoire[]>(this.apiURL + "/all", { headers: httpHeaders });*/
    return this.http.get<Accessoire[]>(this.apiURL + "/all");
  }



  ajouterAccessoire(acc: Accessoire): Observable<Accessoire> {
    let jwt = this.authService.getToken();
    jwt = "Bearer " + jwt;
    let httpHeaders = new HttpHeaders({ "Authorization": jwt })
    return this.http.post<Accessoire>(this.apiURL + "/createAccessoire", acc, { headers: httpHeaders });
  }



  supprimerAccessoire(id: number) {
    const url = `${this.apiURL}/deleteAccessoire/${id}`;
    let jwt = this.authService.getToken();
    jwt = "Bearer " + jwt;
    let httpHeaders = new HttpHeaders({ "Authorization": jwt })

    return this.http.delete(url, { headers: httpHeaders });
  }

  consulterAccessoire(id: number): Observable<Accessoire> {
    const url = `${this.apiURL}/getAccessoireById/${id}`;
    console.log(url);
    let jwt = this.authService.getToken();
    jwt = "Bearer " + jwt;
    let httpHeaders = new HttpHeaders({ "Authorization": jwt })
    return this.http.get<Accessoire>(url, { headers: httpHeaders });
  }

  updateAccessoire(acc: Accessoire): Observable<Accessoire> {

    console.log(acc.marque);
    let jwt = this.authService.getToken();
    jwt = "Bearer " + jwt;
    let httpHeaders = new HttpHeaders({ "Authorization": jwt })
    return this.http.put<Accessoire>(this.apiURL + "/updateAccessoire", acc, { headers: httpHeaders });
  }

  /*trierAccessoires() {
    this.accessoires = this.accessoires.sort((n1, n2) => {
      if (n1.idAccessoire! > n2.idAccessoire!) {
        return 1;
      }
      if (n1.idAccessoire! < n2.idAccessoire!) {
        return -1;
      }
      return 0;
    });
  }*/

  listeMarques(): Observable<MarqueWrapper> {
    let jwt = this.authService.getToken();
    jwt = "Bearer " + jwt;
    let httpHeaders = new HttpHeaders({ "Authorization": jwt })
    return this.http.get<MarqueWrapper>(this.apiURLMar, { headers: httpHeaders });
  }

  /*consulterMarque(id: number): Marque {
    return this.marques.find((cat) => cat.idMar == id)!;
  }*/

  rechercherParMarque(idCat: number): Observable<Accessoire[]> {
    const url = `${this.apiURL}/accmarque/${idCat}`;
    return this.http.get<Accessoire[]>(url);
  }

  rechercherParNom(nom: string): Observable<Accessoire[]> {
    const url = `${this.apiURL}/accsByName/${nom}`;
    return this.http.get<Accessoire[]>(url);
  }
  ajouterMarque(mar: Marque): Observable<Marque> {
    return this.http.post<Marque>(this.apiURLMar, mar, httpOptions);
  }


  //gestion des images


  uploadImage(file: File, filename: string): Observable<Image> {
    const imageFormData = new FormData();
    imageFormData.append('image', file, filename);
    const url = `${this.apiURL + '/image/upload'}`;
    return this.http.post<Image>(url, imageFormData);
  }


  loadImage(id: number): Observable<Image> {
    const url = `${this.apiURL + '/image/get/info'}/${id}`;
    return this.http.get<Image>(url);
  }

  uploadImageProd(file: File, filename: string, idAcc:number): Observable<any>{
    const imageFormData = new FormData();
    imageFormData.append('image', file, filename);
    const url = `${this.apiURL + '/image/uploadImageAcc'}/${idAcc}`;
    return this.http.post(url, imageFormData);
    }

    supprimerImage(id : number) {
      const url = `${this.apiURL}/image/delete/${id}`;
      return this.http.delete(url, httpOptions);
      }
    
}
