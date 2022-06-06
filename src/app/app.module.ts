import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';



import { DemoMaterialModule } from './TEMPLATES/material-modules';
import { Item1Component } from './item/item1/item1.component';
import { Item2Component } from './item/item2/item2.component';
import { Item3Component } from './item/item3/item3.component';
import { Item4Component } from './item/item4/item4.component';
import { BusComponent } from './bus/bus.component';
import { AddBusComponent } from './bus/add-bus/add-bus.component'
import { BusService} from './service/BusService';
import { NotificationService } from './service/NotificationService';

import { AngularFireModule } from '@angular/fire';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { ReactiveFormsModule,FormsModule } from "@angular/forms";
import { environment } from '../environments/environment';
import * as firebase from 'firebase';
import { BusListComponent } from './bus/bus-list/bus-list.component';
import { LigneComponent } from './ligne/ligne.component';
import { AddLigneComponent } from './ligne/add-ligne/add-ligne.component';
import { LigneListComponent } from './ligne/ligne-list/ligne-list.component';
import { ChauffeurComponent } from './chauffeur/chauffeur.component';
import { AddChauffeurComponent } from './chauffeur/add-chauffeur/add-chauffeur.component';
import { ChauffeurListComponent } from './chauffeur/chauffeur-list/chauffeur-list.component';
import { ChauffeurService } from './service/ChauffeurService';
import { VoyageComponent } from './voyage/voyage.component';
import { AddVoyageComponent } from './voyage/add-voyage/add-voyage.component';
import { VoyageListComponent } from './voyage/voyage-list/voyage-list.component';
import { LigneService } from './service/LigneService';
import { VoyageService } from './service/VoyageService';
import { DashboardComponent } from './dashboard/dashboard/dashboard.component';
import { HomeComponent } from './home/home/home.component';
import { LoginService } from './service/LoginService';
import { LoginComponent } from './login/login/login.component';
import { ChartsModule } from 'ng2-charts';
import { UsersService } from './service/UsersService';
//import { HighchartsChartModule } from 'highcharts-angular'
//import { charts } from 'highcharts';
//import * as Highcharts from 'highcharts';
//import { ChartsModule } from 'ng2-charts';

import { AuthGuardService } from './service/AuthGuardService';
import { RoleGuardService } from './service/RoleGuardService';
import { StationComponent } from './station/station.component';
import { TicketComponent } from './ticket/ticket.component';
import { PlanningComponent } from './planning/planning.component';
import { TicketListDialogComponent } from './ticket-list-dialog/ticket-list-dialog.component';
import { ImprimerTicketComponent } from './imprimer-ticket/imprimer-ticket.component';
import { VoyagelistComponent } from './voyagelist/voyagelist.component';
import { MatConfirmDialogComponent } from './mat-confirm-dialog/mat-confirm-dialog.component';
import { MatDialogComponent } from './mat-dialog/mat-dialog.component';

@NgModule({
  declarations: [
    AppComponent,
    Item1Component,
    Item2Component,
    Item3Component,
    Item4Component,
    BusComponent,
    AddBusComponent,
    BusListComponent,
    LigneComponent,
    AddLigneComponent,
    LigneListComponent,
    ChauffeurComponent,
    AddChauffeurComponent,
    ChauffeurListComponent,
    VoyageComponent,
    AddVoyageComponent,
    VoyageListComponent,
    DashboardComponent,
    HomeComponent,
    LoginComponent,
    StationComponent,
    TicketComponent,
    PlanningComponent,
    TicketListDialogComponent,
    ImprimerTicketComponent,
    VoyagelistComponent,
    MatConfirmDialogComponent,
    MatDialogComponent,
    
    
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    DemoMaterialModule,
    ReactiveFormsModule,
    AngularFireDatabaseModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    FormsModule,
    ChartsModule
   

    
  ],
  providers: [ 
    BusService,
    NotificationService,
    ChauffeurService,
    LigneService,
    VoyageService,
    LoginService,
    UsersService,
    AuthGuardService,
    RoleGuardService
  ],
  bootstrap: [AppComponent],
  entryComponents:[AddBusComponent,MatConfirmDialogComponent,MatDialogComponent]
})
export class AppModule { }
