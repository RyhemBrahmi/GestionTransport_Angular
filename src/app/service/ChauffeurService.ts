import { Injectable } from '@angular/core';
import { FormGroup, FormControl,Validators} from "@angular/forms";
import { AngularFireList }  from '@angular/fire/database';
import { AngularFireDatabase } from '@angular/fire/database';
import * as _ from 'lodash';


@Injectable({
  providedIn: 'root'
})
export class ChauffeurService {
  

  constructor(private firebase: AngularFireDatabase) { }
  
  chauffeurList: AngularFireList<any>;

  public form: FormGroup = new FormGroup({
    key: new FormControl(null),
    matricule: new FormControl('',
    [
      Validators.required,
      Validators.pattern("^[0-9]*$"), 
      Validators.minLength(6),
      Validators.maxLength(6)
    ]
    ),
    nom: new FormControl('',
       [
          Validators.required,
          Validators.maxLength(50),
          Validators.pattern('^[a-zA-Z ]*$')
        ]
    ),
    prenom: new FormControl('',
       [
          Validators.required,
          Validators.maxLength(50),
          Validators.pattern('^[a-zA-Z ]*$')
        ]),
    numeroTelephone: new FormControl('',
    [
      Validators.required,
      Validators.pattern("^[0-9]*$"), 
      Validators.minLength(8),
      Validators.maxLength(8)
    ]
    ),
    adresse: new FormControl(''),
    //nombreVoyages: new FormControl('')

  });

  initializeFormGroup(){
    this.form.setValue({
      key: null,
      matricule: '',
      nom: '',
      prenom: '',
      numeroTelephone: '',
      adresse: '',
      //nombreVoyages: '',

    }) 
  }

  getChauffeur() {
    this.chauffeurList = this.firebase.list('chauffeur');
    return this.chauffeurList.snapshotChanges();
  }
  
  insertChauffeur(chauffeur) {

    this.chauffeurList.push(chauffeur).then(()=> {
      console.log("Add successfully");
    }); 

  }

   updateChauffeur(chauffeur) {
    this.chauffeurList.update(chauffeur.key,
      {
        matricule: chauffeur.matricule,
        nom: chauffeur.nom,
        prenom: chauffeur.prenom,
        numeroTelephone: chauffeur.numeroTelephone,
        adresse: chauffeur.adresse,
        //nombreVoyages:chauffeur.nombreVoyages,
      });
   }

    
   deleteChauffeur($key: string) {
    this.chauffeurList.remove($key);
  }

  populateForm(chauffeur: any){
    console.log("Populating the form");
    this.form.setValue(chauffeur);
    // this.form.setValue(_.omit(chauffeur,''));
  }






}
