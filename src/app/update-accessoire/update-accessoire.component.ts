import { Component, OnInit } from '@angular/core';
import { Accessoire } from '../model/accessoire.model';
import { ActivatedRoute, Router } from '@angular/router';
import { AccessoireService } from '../services/accessoire.service';
import { Marque } from '../model/marque.model';
import { Image } from '../model/image.model';

@Component({
  selector: 'app-update-accessoire',
  templateUrl: './update-accessoire.component.html',
  styles: [],
})
export class UpdateAccessoireComponent implements OnInit {
  currentAccessoire = new Accessoire();

  marques!: Marque[];
  updatedMarId!: number;

  myImage!: string;

  uploadedImage!: File;
  isImageUpdated: Boolean = false;

  constructor(
    private activatedRoute: ActivatedRoute,
    private accService: AccessoireService,
    private router: Router
  ) { }

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

  onImageUpload(event: any) {
    if (event.target.files && event.target.files.length) {
      this.uploadedImage = event.target.files[0];
      this.isImageUpdated = true;
      const reader = new FileReader();
      reader.readAsDataURL(this.uploadedImage);
      reader.onload = () => { this.myImage = reader.result as string; };
    }
  }

  onAddImageAcc() {
    this.accService
    .uploadImageProd(this.uploadedImage,
    this.uploadedImage.name,this.currentAccessoire.idAccessoire)
    .subscribe( (img : Image) => {
    this.currentAccessoire.images.push(img);
    });
    }
    supprimerImage(img: Image){
      let conf = confirm("Etes-vous sûr ?");
      if (conf)
      this.accService.supprimerImage(img.idImage).subscribe(() => {
      //supprimer image du tableau currentProduit.images
      const index = this.currentAccessoire.images.indexOf(img, 0);
      if (index > -1) {
      this.currentAccessoire.images.splice(index, 1);
      }
      });
      }

}
