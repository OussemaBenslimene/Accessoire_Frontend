import { Component, OnInit } from '@angular/core';
import { Accessoire } from '../model/accessoire.model';
import { AccessoireService } from '../services/accessoire.service';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-accessoires',
  templateUrl: './accessoires.component.html',
  styleUrls: ['./accessoires.component.css'],
})
export class AccessoiresComponent implements OnInit{
  accessoires!: Accessoire[]; //table of strings

  constructor(private accService: AccessoireService ,public authService: AuthService) {
    //this.accessoires = accService.listeAccessoires();
  }
  ngOnInit(): void {
    this.accService.listeAccessoires().subscribe(accs => {
      console.log(accs);
      this.accessoires = accs;
      });
      
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
