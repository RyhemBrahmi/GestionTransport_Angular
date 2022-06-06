import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth'
import { User } from '../Models/User';
@Injectable({
  providedIn: 'root'
})
export class LoginService {
 
  isLoggedIn = false

  constructor(public firebaseAuth : AngularFireAuth) {
   
  }

  // We have to return the result to login.ts - l khedma tsir ghadi bech nakdhmou 3laha ect,

  signin(email: string,password :string) {
    return this.firebaseAuth.signInWithEmailAndPassword(email,password);
  }

  // WE WILL TEST IT LATER 

 signup(email: string,password :string){
    return this.firebaseAuth.createUserWithEmailAndPassword(email,password);
  }

 logout(){
    return this.firebaseAuth.signOut();
  }


  // SAVE USER TO THE STOARAGE
  saveUserStorage(userData: any) {
    localStorage.setItem('user',JSON.stringify(userData));
  }

  // REMOVING USER TO THE STOARAGE
  removeUserStorage() {
    localStorage.removeItem('user');
  }

  getUserStorage(): User {
    var user = localStorage.getItem('user');
    var parsedUser = JSON.parse(user);
    return parsedUser;
  }

}
