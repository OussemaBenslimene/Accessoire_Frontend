import { Component, OnInit } from '@angular/core';
import { Accessoire } from '../model/accessoire.model';
import { Marque } from '../model/marque.model';
import { AccessoireService } from '../services/accessoire.service';

@Component({
  selector: 'app-recherche-par-marque',
  templateUrl: './recherche-par-marque.component.html',
  styles: [],
})
export class RechercheParMarqueComponent implements OnInit {
  accessoires!: Accessoire[];
  IdMarque!: number;
  marques!: Marque[];

  constructor(private accService: AccessoireService) {}

  ngOnInit(): void {
    this.accService.listeMarques().subscribe((mar) => {
      this.marques = mar._embedded.marques;
      console.log(mar);
    });
  }
  onChange() {
    this.accService.rechercherParMarque(this.IdMarque).subscribe(accs =>{this.accessoires=accs});
    }

    chargerProduits(){
      this.accService.listeAccessoires().subscribe(accs => {
      console.log(accs);
      this.accessoires = accs;
      });
      }
  
      
    supprimerAccessoire(acc: Accessoire) {
      //console.table(acc);
      {
        let conf = confirm("Etes-vous sûr ?");
        if (conf)
        this.accService.supprimerAccessoire(acc.idAccessoire).subscribe(() => {
        console.log("produit supprimé");
        this.chargerProduits();
        });
        
    }
  }
}
