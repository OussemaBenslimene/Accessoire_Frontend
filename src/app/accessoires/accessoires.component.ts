import { Component, OnInit } from '@angular/core';
import { Accessoire } from '../model/accessoire.model';
import { AccessoireService } from '../services/accessoire.service';
import { AuthService } from '../services/auth.service';
import { Image } from '../model/image.model';


@Component({
  selector: 'app-accessoires',
  templateUrl: './accessoires.component.html',
  styleUrls: ['./accessoires.component.css'],
})
export class AccessoiresComponent implements OnInit {
  accessoires!: Accessoire[]; //table of strings

  constructor(private accService: AccessoireService, public authService: AuthService) {
    //this.accessoires = accService.listeAccessoires();
  }
  ngOnInit(): void {
    this.chargerAccs()

  }


  chargerAccs() {
    this.accService.listeAccessoires().subscribe(accs => {
      console.log(accs);
      this.accessoires = accs;

      this.accessoires.forEach((acc) => {
        acc.imageStr = 'data:' + acc.images[0].type + ';base64,' +
          acc.images[0].image;
      });
    });

  }


  supprimerAccessoire(acc: Accessoire) {
    //console.table(acc);
    {
      let conf = confirm("Etes-vous sûr ?");
      if (conf)
        this.accService.supprimerAccessoire(acc.idAccessoire).subscribe(() => {
          console.log("produit supprimé");
          this.chargerAccs();
        });

    }
  }

}
