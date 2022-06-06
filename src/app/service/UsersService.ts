import { Injectable } from '@angular/core';
import { AngularFireDatabase , AngularFireList } from '@angular/fire/database';
import {  AngularFirestore } from '@angular/fire/firestore';

import { User } from '../Models/User';
import { take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  //usersList: AngularFireList<any>;

  constructor(private firestore: AngularFirestore) { }
  
  // Adding user details to firestore with uid reference
  addUserToFirestore(user: User ){
    return this.firestore.doc('users/' + user.uid).set(user);
  } 



  // Getting user details from firestore with uid reference
  getUserFromFirestore(uid) {
    return this.firestore.collection('users').doc(uid).valueChanges().pipe(take(1));;
  }

  // Later
  // Edit user details from firestore with uid reference
  editUserFromFirestore(uid) {

  }


}

/* this.usersList = this.firebase.list('test/268468451');
 
   this.usersList.push({
     name: "ryhem"
   })
   this.usersList.update('268468451', {
     name: "ryhem",
     role: "admin"
   })
 
  busList: AngularFireList<any>;




 constructor(private firebase: AngularFireDatabase) {
   
  this.busList = this.firebase.list('test/268468451');

  this.busList.push({
    name: "ryhem"
  })
  this.busList.update('268468451', {
    name: "ryhem",
    role: "admin"
  })

 } */


