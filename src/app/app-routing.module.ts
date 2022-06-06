import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { AddBusComponent } from './bus/add-bus/add-bus.component';
import { BusComponent } from './bus/bus.component';
import { ChauffeurComponent } from './chauffeur/chauffeur.component';
import { DashboardComponent } from './dashboard/dashboard/dashboard.component';
import { HomeComponent } from './home/home/home.component';
import { Item1Component } from './item/item1/item1.component';
import { Item2Component } from './item/item2/item2.component';
import { Item3Component } from './item/item3/item3.component';
import { Item4Component } from './item/item4/item4.component';
import { LigneComponent } from './ligne/ligne.component';
import { LoginComponent } from './login/login/login.component';
import { VoyageComponent } from './voyage/voyage.component';

import { AuthGuardService as AuthGuard } from './service/AuthGuardService';
import { RoleGuardService as RoleGuard } from './service/RoleGuardService';
import { StationComponent } from './station/station.component';
import { TicketComponent } from './ticket/ticket.component';
import { PlanningComponent } from './planning/planning.component';

const routes: Routes = [
  {
    path:'login',
    component:LoginComponent
  },
  {
    path:'',
    redirectTo: 'login',
    pathMatch: 'full',  
  },
  {
    path:'home',
    component:HomeComponent,
    // canActivateChild: [AuthGuard],
    canActivateChild: [RoleGuard],
    children: [ 
      {
        path:'dashboard',
        component:DashboardComponent,
        data: { 
          expectedRoles: ["admin","editor"]
        },
      },
      {
        path:'',
        redirectTo: 'dashboard',
        pathMatch: 'full',  
        data: { 
          expectedRoles: ["admin","editor"]
        },
      },
      {
        path:'bus',
        component:BusComponent,
        data: { 
          expectedRoles: ["admin"]
        },
      },
      {
        path: 'chauffeur',
        component:ChauffeurComponent,
        data: { 
          expectedRoles: ["admin"]
        },
      },
      {
        path: 'ligne',
        component:LigneComponent,
        data: { 
          expectedRoles: ["admin"]
        },
      },
     
      {
        path:'voyage',
        component:VoyageComponent,
        data: { 
          expectedRoles: ["admin"]
        },
      },
      {
        path:'station',
        component:StationComponent,
        data: { 
          expectedRoles: ["admin"]
        },
      },
      {
        path:'ticket',
        component:TicketComponent,
        data: { 
          expectedRoles: ["admin", "editor"]
        },
      },
      {
        path:'planning',
        component:PlanningComponent,
        data: { 
          expectedRoles: ["admin", "editor"]
        },
      },
    ]
  },
  
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
