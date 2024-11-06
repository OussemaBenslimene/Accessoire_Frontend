import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AddAccessoireComponent } from './add-accessoire/add-accessoire.component';
import { AccessoiresComponent } from './accessoires/accessoires.component';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UpdateAccessoireComponent } from './update-accessoire/update-accessoire.component';
import { HTTP_INTERCEPTORS, provideHttpClient, withInterceptorsFromDi ,HttpClientModule} from '@angular/common/http';
import { RechercheParMarqueComponent } from './recherche-par-marque/recherche-par-marque.component';
import { RechercheParNomComponent } from './recherche-par-nom/recherche-par-nom.component';
import { SearchFilterPipe } from './search-filter.pipe';
import { Ng2SearchPipeModule } from 'ng2-search-filter/src/ng2-filter.module';
import { ListeMarquesComponent } from './liste-marques/liste-marques.component';
import { UpdateMarqueComponent } from './update-marque/update-marque.component';
import { LoginComponent } from './login/login.component';
import { ForbiddenComponent } from './forbidden/forbidden.component';
import { TokenInterceptor } from './token.interceptor';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';



@NgModule({ declarations: [
        AppComponent,
        AddAccessoireComponent,
        AccessoiresComponent,
        UpdateAccessoireComponent,
        RechercheParMarqueComponent,
        RechercheParNomComponent,
        SearchFilterPipe,
        ListeMarquesComponent,
        UpdateMarqueComponent,
        LoginComponent,
        ForbiddenComponent
    ],
    bootstrap: [AppComponent],
     imports: [BrowserModule,
        AppRoutingModule,
        FormsModule,
        HttpClientModule ,
        ReactiveFormsModule,
        BrowserAnimationsModule,
        ToastrModule.forRoot()],
    providers: [{ provide : HTTP_INTERCEPTORS,
        useClass : TokenInterceptor,
        multi : true}] 
    })
export class AppModule { }
