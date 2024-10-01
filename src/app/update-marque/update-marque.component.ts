import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Accessoire } from '../model/accessoire.model';
import { Marque } from '../model/marque.model';

@Component({
  selector: 'app-update-marque',
  templateUrl: './update-marque.component.html',
  styles: [],
})
export class UpdateMarqueComponent {
  @Input()
  marque!: Marque;

  @Output()
  marqueUpdated = new EventEmitter<Marque>();

  @Input()
  ajout!:boolean;

  ngOnInit(): void {
    console.log("ngOnInit du composant UpdateCategorie ",this.marque);
    }

    saveMarque(){
      this.marqueUpdated.emit(this.marque);
      }
}
