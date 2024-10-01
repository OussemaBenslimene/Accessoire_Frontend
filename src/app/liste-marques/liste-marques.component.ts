import { Component, OnInit } from '@angular/core';
import { Marque } from '../model/marque.model';
import { AccessoireService } from '../services/accessoire.service';

@Component({
  selector: 'app-liste-marques',
  templateUrl: './liste-marques.component.html',
  styles: [],
})
export class ListeMarquesComponent implements OnInit {
  updatedMar: Marque = { idMar: 0, nomMar: '' };
  marques!: Marque[];

  ajout:boolean=true;

  constructor(private accService: AccessoireService) {}

  ngOnInit(): void {
    this.accService.listeMarques().subscribe((mar) => {
      this.marques = mar._embedded.marques;
      console.log(mar);
    });
  }
  marqueUpdated(mar: Marque) {
    console.log('Mar updated event', mar);
    this.accService
      .ajouterMarque(mar)
      .subscribe(() => this.chargerMarques());
  }
  chargerMarques(){
    this.accService.listeMarques().
    subscribe(mar => {this.marques = mar._embedded.marques;
    console.log(mar);
    });
    }
    updateMar(mar:Marque) {
      this.updatedMar=mar;
      this.ajout=false; 

      }
}
