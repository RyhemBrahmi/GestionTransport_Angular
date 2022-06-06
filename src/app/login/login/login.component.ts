import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/service/LoginService';
import { ResolveStart, Router, RouterLink } from '@angular/router';
import { Route } from '@angular/compiler/src/core';
import { UsersService } from 'src/app/service/UsersService';

import { User } from '../../Models/User';
import { Roles } from '../../Models/Roles';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  dataLoader: boolean = false;

  isSignedIn = false
  constructor( public loginService: LoginService, private router: Router,public usersService:UsersService ) { }

  ngOnInit(){

    if(localStorage.getItem('user')!== null)
      this.isSignedIn= true
    else 
      this.isSignedIn= false
  }


  onSignup(email: string, password: string){
    console.log("Signin' up");

    this.dataLoader = true;

    this.loginService.signup(email,password).then( (res: any) => {
 

      console.log('User Data');
      console.log(res.user);

      var userRole: Roles = {
        admin: true,
        subscriber: true, 
        editor: true
      } 

      // we have to change name and role dynamically (nevermind xd ) 
      var dummyUserDetails: User = {
        uid: res.user.uid,
        name: 'Ryhem', 
        roles: userRole
      }
      
      this.usersService.addUserToFirestore(dummyUserDetails).then(data => {
        console.log("Adding user to firestore document");
        console.log(data);

        this.dataLoader = false;
        
      }, err => {
          console.log(err);
          this.dataLoader = false;
      })
       
    }, err => {
      // Handling Errors
      console.log(err);
      this.dataLoader = false;
    } )

  }

  // LOGIN METHOD
  onSignin(email:string,password:string){
    // console.log("Signin' in");
  
    this.dataLoader = true;

    this.loginService.signin(email,password).then( (res: any) => {
      // IN CASE THE USER IS ALREADY EXIST
      // console.log('User Data');
       // console.log(res.user);
 
       var userId = res.user.uid;
       // Retrieve user details from firestore
       // console.log("Getting data for", userId);
       
       this.usersService.getUserFromFirestore(userId).subscribe(data => {
      
        this.dataLoader = false;

          // console.log(data);
          
          // console.log('Redirection to home page with angular Authguard activated');
          // SAVING THE USER IN THE STORAGE.
          // hna najmou nbadlou fel user ltsajel f storage, ama men ba3d enti w authguard, l 7asilou hhh 
          this.loginService.saveUserStorage(data);

          // REDIRET USER TO HOME PAGE
          setTimeout(() => {
            this.router.navigate(["home"]); 
          },100 );
       
      }, err => {
       this.dataLoader = false;
        console.log(err);
       })

            

    }, err => {
      // IN CASE USER IN NOT FOUND 
      // ANALYSING ERRORS - SHOWING POPUP MESSAGE - no record found
      console.log(err.message);
      // BEAUTIFY THIS LATER hak bech thcoufi l alert makhiebha taw tbadel rayek hhh hhh behy
      alert(err.message);
      this.dataLoader = false;
    })

  }

  // For testing purposes
  getUserFirestore(uid) {
    console.log("Getting data for", uid);
    this.usersService.getUserFromFirestore(uid).subscribe(data => {
      console.log(data);
    }, err => {
      console.log(err);
    })
  }


  handleLogout(){
    return this.loginService.logout();
  }
  
}
