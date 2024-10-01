import { Component, OnInit } from '@angular/core';
import { Accessoire } from '../model/accessoire.model';
import { ActivatedRoute, Router } from '@angular/router';
import { AccessoireService } from '../services/accessoire.service';
import { Marque } from '../model/marque.model';

@Component({
  selector: 'app-update-accessoire',
  templateUrl: './update-accessoire.component.html',
  styles: [],
})
export class UpdateAccessoireComponent implements OnInit {
  currentAccessoire = new Accessoire();

  marques!: Marque[];
  updatedMarId!: number;

  constructor(
    private activatedRoute: ActivatedRoute,
    private accService: AccessoireService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.accService.listeMarques().subscribe((mar) => {
      this.marques = mar._embedded.marques;
      console.log(mar);
    });
    this.accService
      .consulterAccessoire(this.activatedRoute.snapshot.params['id'])
      .subscribe((acc) => {
        this.currentAccessoire = acc;
        this.updatedMarId = this.currentAccessoire.marque.idMar;
      });
  }
  updateAccessoire() {
    this.currentAccessoire.marque = this.marques.find(
      (mar) => mar.idMar == this.updatedMarId
    )!;
    this.accService
      .updateAccessoire(this.currentAccessoire)
      .subscribe((acc) => {
        this.router.navigate(['accessoires']);
      });
  }
}
