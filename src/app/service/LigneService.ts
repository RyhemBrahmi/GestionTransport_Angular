import { Injectable } from '@angular/core';
import { FormGroup, FormControl,Validators} from "@angular/forms";
//import { Firebase } from '@angular/fire';
import { AngularFireList }  from '@angular/fire/database';
//import * as firebase from 'firebase';
//import * as firebase from 'firebase/app';
//import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFireDatabase } from '@angular/fire/database';
import * as _ from 'lodash';

@Injectable({
  providedIn: 'root'
})
export class LigneService {

  constructor(private firebase: AngularFireDatabase) { }
  ligneList: AngularFireList<any>;


  public form: FormGroup = new FormGroup({
    key: new FormControl(null),
    villedepart: new FormControl('',Validators.required),
    nombrestation: new FormControl('',
    [
      Validators.required,
      Validators.pattern("^[0-9]*$"), 
      Validators.minLength(1),
      Validators.maxLength(2)
    ]),
    villearrivee: new FormControl('',Validators.required),
  });
  initializeFormGroup(){
    this.form.setValue({
      key: null,
      villedepart:'',
      nombrestation: '',
      villearrivee:'',
    })
  }

  getLigne() {
    this.ligneList = this.firebase.list('ligne');
    return this.ligneList.snapshotChanges();
  }
  
  insertLigne(ligne) {

    this.ligneList.push(ligne).then(()=> {
      console.log("Add successfully");
    }); 

  }

  updateLigne(ligne) {

    // console.log(ligne);
    var newLigne = ligne;
    // GET STATIONS FOR THE GIVEN LIGNE
    this.getOneLigne(newLigne.key).once('value', data => {

      var result = data.val();
      console.log(result);
      
      if(result.stations)
        newLigne.stations = result.stations;

      console.log(newLigne);
      this.ligneList.update(ligne.key,newLigne);

    }, err => {
      console.log("Can't get ligne for the update");
    })
   }

   deleteLigne($key: string) {
    this.ligneList.remove($key);
  }


  updateLigneOvbservale(ligne) {
    return this.ligneList.update(ligne.key, ligne);
   }
   


  getOneLigne(key) {
    console.log(key);
    var a = this.firebase.database.ref('ligne/' + key);
    return a;
  }


  getOneLignePromis(key) {
    return this.firebase.list('ligne/' + key).snapshotChanges();     
  }


  populateForm(ligne: any){
    console.log("Populating the form");
    this.form.setValue(ligne);
    // this.form.setValue(_.omit(ligne,''));
  }
}
