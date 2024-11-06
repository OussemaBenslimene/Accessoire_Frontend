import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccessoiresComponent } from './accessoires/accessoires.component';
import { AddAccessoireComponent } from './add-accessoire/add-accessoire.component';
import { UpdateAccessoireComponent } from './update-accessoire/update-accessoire.component';
import { RechercheParMarqueComponent } from './recherche-par-marque/recherche-par-marque.component';
import { RechercheParNomComponent } from './recherche-par-nom/recherche-par-nom.component';
import { ListeMarquesComponent } from './liste-marques/liste-marques.component';
import { LoginComponent } from './login/login.component';
import { ForbiddenComponent } from './forbidden/forbidden.component';
import { AccessoireGuard } from './services/accessoire.guard';
import { RegisterComponent } from './register/register.component';
import { VerifEmailComponent } from './verif-email/verif-email.component';

const routes: Routes = [
  {path: "accessoires", component : AccessoiresComponent},
  {path: "add-accessoire", component : AddAccessoireComponent , canActivate:[AccessoireGuard]},
  { path: "", redirectTo: "accessoires", pathMatch: "full" },
  {path: "updateAccessoire/:id", component: UpdateAccessoireComponent},
  {path: "rechercheParMarque", component : RechercheParMarqueComponent},
  {path: "rechercheParNom", component : RechercheParNomComponent},
  {path: "listeMarques", component : ListeMarquesComponent},
  {path: 'login', component: LoginComponent},
  {path: 'app-forbidden', component: ForbiddenComponent},
  {path:'register',component: RegisterComponent},
  { path: 'verifEmail', component: VerifEmailComponent },


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
