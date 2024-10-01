import { Injectable } from '@angular/core';
import { Accessoire } from '../model/accessoire.model';
import { Marque } from '../model/marque.model';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { MarqueWrapper } from '../model/marqueWrapped.model';
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
};

@Injectable({
  providedIn: 'root',
})
export class AccessoireService {
  apiURL: string = 'http://localhost:8080/accessoire/api';
  apiURLMar: string = 'http://localhost:8080/accessoire/mar';

  marques: Marque[];

  accessoires: Accessoire[]; //table of strings
  accessoire!: Accessoire;

  constructor(private http: HttpClient) {
    this.marques = [
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
    ];
  }

  listeAccessoires(): Observable<Accessoire[]> {
    return this.http.get<Accessoire[]>(this.apiURL);
  }
  ajouterAccessoire(acc: Accessoire): Observable<Accessoire> {
    return this.http.post<Accessoire>(this.apiURL, acc, httpOptions);
  }
  supprimerAccessoire(id: number) {
    const url = `${this.apiURL}/${id}`;
    return this.http.delete(url, httpOptions);
  }

  consulterAccessoire(id: number): Observable<Accessoire> {
    this.accessoire = this.accessoires.find((p) => p.idAccessoire == id)!;
    const url = `${this.apiURL}/${id}`;
    return this.http.get<Accessoire>(url);
  }

  updateAccessoire(acc: Accessoire): Observable<Accessoire> {
    return this.http.put<Accessoire>(this.apiURL, acc, httpOptions);
  }

  trierAccessoires() {
    this.accessoires = this.accessoires.sort((n1, n2) => {
      if (n1.idAccessoire! > n2.idAccessoire!) {
        return 1;
      }
      if (n1.idAccessoire! < n2.idAccessoire!) {
        return -1;
      }
      return 0;
    });
  }

  listeMarques(): Observable<MarqueWrapper> {
    return this.http.get<MarqueWrapper>(this.apiURLMar);
  }
  consulterMarque(id: number): Marque {
    return this.marques.find((cat) => cat.idMar == id)!;
  }

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
}
