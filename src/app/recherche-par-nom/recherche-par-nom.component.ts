import { Component, OnInit } from '@angular/core';
import { Accessoire } from '../model/accessoire.model';
import { Marque } from '../model/marque.model';
import { AccessoireService } from '../services/accessoire.service';

@Component({
  selector: 'app-recherche-par-nom',
  templateUrl: './recherche-par-nom.component.html',
  styles: [],
})
export class RechercheParNomComponent implements OnInit {
  accessoires!: Accessoire[];
  IdMarque!: number;
  marques!: Marque[];
  AllAccessoires! : Accessoire[];

  searchTerm!: string;

  constructor(private accService: AccessoireService) {}

  ngOnInit(): void {
    this.accService.listeAccessoires().subscribe((accs) => {
      this.AllAccessoires = accs
      console.log(accs);
    });
  }
 

  supprimerAccessoire(acc: Accessoire) {
    //console.table(acc);
    {
      let conf = confirm('Etes-vous sûr ?');
      if (conf)
        this.accService.supprimerAccessoire(acc.idAccessoire).subscribe(() => {
          console.log('accessoire supprimé');
          
        });
    }
  }

  onKeyUp(filterText : string){
    this.accessoires = this.AllAccessoires.filter(item => item.libAccessoire.toLowerCase().includes(filterText));
    }
    
}
