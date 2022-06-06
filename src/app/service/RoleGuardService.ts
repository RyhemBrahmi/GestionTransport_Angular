import { Injectable } from '@angular/core';
import { 
  Router,
  CanActivate,
  ActivatedRouteSnapshot,
  CanActivateChild
} from '@angular/router';
import { Roles } from '../Models/Roles';
import { User } from '../Models/User';

import { LoginService } from '../service/LoginService';
import { DialogAcceesService } from './dialog-accees.service';
import { DialogService } from './dialog.service';

@Injectable()
export class RoleGuardService implements CanActivate, CanActivateChild {
  constructor(public loginService: LoginService, public router: Router,private dialogAcceesService: DialogAcceesService) {

    // For testing check user role function

    var dummyPageRoles = ["admin"];
    var dummyUserRoles = {
      editor: false,
      admin: true,
      subscriber: true,
    }

     var r = this.checkUserRole(dummyUserRoles, dummyPageRoles);
     // console.log(r);

  }
  
    
  checkUserRole(userRoles, expectedRoles) {
    // Check if users roles match one of the expected roles 
    /*
    userRoles: {
        admin: true
        editor: true
        subscriber: true
    }

   expectedRoles: ["admin", "editor"]

    */
    console.log("--------------");

    console.log("Checking user role for");
    console.log(userRoles, expectedRoles);

   var userRolesArray = Object.entries(userRoles);
   console.log(userRolesArray);

    /*
      0: (2) ["admin", true] 
      1: (2) ["subscriber", true] 
      2: (2) ["editor", true] 
    */
  
  var verif = false;
 
  for(var i=0; i < userRolesArray.length; i++) {
    var u = userRolesArray[i];

    if(u[1]) {
      // console.log(u);

      for(var j=0; j < expectedRoles.length; j++) {
        var e = expectedRoles[j];
         // console.log(e);

        if(u[0] === e) {
          verif = true;
          break;
        }
         
      }

    }
  }

   return verif;
 
  }

  canActivate(route: ActivatedRouteSnapshot): boolean {

    console.log("can activate role guard");

    // this will be passed from the route config
    // on the data property

    var expectedRole = route.data.expectedRoles;
    
    var user = this.loginService.getUserStorage();
    console.log("User from storage", user);

    // Check if page user's roles match any of the page roles
    
    if (!user || !this.checkUserRole(user.roles, expectedRole)) {
      // this.router.navigate(['login']);
      console.log("You don't have access to this page");
      alert("Vous n'avez pas accès à cette page");
      return false;
    }

    return true;
  }


  canActivateChild(route: ActivatedRouteSnapshot): boolean {
 

    console.log("can activate child role guard");

    // this will be passed from the route config
    // on the data property

    var expectedRole = route.data.expectedRoles;
    console.log("Expected roles --------------- ", expectedRole);

    var user = this.loginService.getUserStorage();
    console.log("User from storage", user);
    
    if(!user) {
      this.router.navigate(['login']);
      return;
    }

    // Check if page user's roles match any of the page roles
    console.log("****************");
    console.log(user);
    console.log(this.checkUserRole(user.roles, expectedRole));
    console.log("****************");

    if (!user || !this.checkUserRole(user.roles, expectedRole)) {
      // this.router.navigate(['login']);
      console.log("You don't have access to this page");
      //alert("Vous n'avez pas accès à cette page");
      this.dialogAcceesService.openConfirmDialog("Vous n'avez pas accès à cette page");
      return false;
    }

    return true;
  }

/*
  onDelete($key){
    // console.log("Deleting", $key);
    // if(confirm('êtes-vous sûr de supprimer cet élement ?')){
      // this.service.deleteBus($key);
      // this.NotificationService.warn('Supprimé avec succès');
    // }
 
    this.dialogService.openConfirmDialog('êtes-vous sûr de supprimer cet élement ?')
    .afterClosed().subscribe(res =>{
      if(res){
           this.service.deleteBus($key);
           this.NotificationService.warn('Supprimé avec succès');
      }
    })
   }
*/
}