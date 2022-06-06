import { Injectable } from '@angular/core';
import { FormGroup, FormControl,Validators} from "@angular/forms";
//import { Firebase } from '@angular/fire';
import { AngularFireList }  from '@angular/fire/database';
//import * as firebase from 'firebase';
//import * as firebase from 'firebase/app';
//import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFireDatabase } from '@angular/fire/database';
import * as _ from 'lodash';

// IMPORTING BUS SERVICE
import { BusService } from '../service/BusService';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class VoyageService {

  // Share voyagelist through the app 
  private voyageListSource = new BehaviorSubject<any>({});
  currentVoyageList = this.voyageListSource.asObservable();


  constructor(private firebase: AngularFireDatabase, private busService: BusService ) {
    this.getVoyageListAtStart();
  }
  voyageList: AngularFireList<any>; 

  getCurrentVoyageList() {
    return this.currentVoyageList;
  }


  public form: FormGroup = new FormGroup({
    key: new FormControl(null),
    ligne: new FormControl('',Validators.required),
    voyageParent: new FormControl(''),
    stationdepart: new FormControl('',Validators.required),
    heuredepart: new FormControl('',
    [
      Validators.required,
      Validators.pattern("^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$"),
    ]),
    stationarrivee: new FormControl('',Validators.required),
    heurearrivee: new FormControl('',
    [
      Validators.required,
      Validators.pattern("^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$"),
    ]),
    dateVoyage: new FormControl('', Validators.required),
    matriculebus: new FormControl('',Validators.required),
    //categoriebus: new FormControl(''),
    //distance: new FormControl(''),
    tarifs: new FormControl('', [
      Validators.required,
      Validators.pattern("[0-9]+(\.[0-9][0-9][0-9]?)?"),
    ]
    ),
    //dateMiseS: new FormControl(''),
    nombreplacedisponible: new FormControl(0),
    nombreplacereservee: new FormControl(0),
  });


  initializeFormGroup(){

    this.form.setValue({
      key: null,
      ligne:'',
      voyageParent:'',
      stationdepart:'',
      heuredepart:'',
      stationarrivee:'',
      heurearrivee:'',
      matriculebus:'',
      dateVoyage:'',
      //categoriebus:'',
      //distance:'',
      //dateMiseS:'',
      tarifs:'',
      nombreplacedisponible: 0,
      nombreplacereservee: 0,
    })

  }

  // GETTING DATA FOR THE BUS
  getTripVehicule($key) {
    console.log("Get data for bus");
  }

  getVoyageListAtStart() {
    this.voyageList = this.firebase.list('voyage');
    this.voyageList.snapshotChanges().subscribe(data => {

      let array = data.map(item => {
        return {
          key: item.key,
          ...item.payload.val()
        };
      });

      this.voyageListSource.next(array);

    });
  }

  getVoyage() {
    this.voyageList = this.firebase.list('voyage');
    return this.voyageList.snapshotChanges();
  }
 
  
  getVoyageValueChanges() {
    this.voyageList = this.firebase.list('voyage');
    return this.voyageList.valueChanges();
  }


  insertVoyage(voyage) {

    this.voyageList.push(voyage).then(()=> {
      console.log("Add successfully");
    }); 

  }

  updateVoyage(voyage) {
    // GET STATIONS FOR THE GIVEN LIGNE
    this.getOneTrip(voyage.key).once('value', data => {

      var result = data.val();
      console.log(result);
      
      if(result.tickets)
        voyage.tickets = result.tickets;

      console.log(voyage);

      this.voyageList.update(voyage.key, voyage);

    }, err => {
      console.log("Can't get ligne for the update");
    })

   
   }

   // We ll this for now
   updateVoyagePromis(key, voyage) {
    return this.voyageList.update(key, voyage);
   }


   updateVoyageTicket(voyage) {
    this.getOneTrip(voyage.key).once('value', data => {

      this.voyageList.update(voyage.key, voyage);

    }, err => {
      console.log("Can't get ligne for the update");
    })

   }


   deleteVoyage($key: string) {
    this.voyageList.remove($key);
  }

  populateForm(voyage: any){
    console.log("Populating the form");

    var tt =  new Date(voyage.dateVoyage);
    var t = new Date((tt.getTime() - tt.getTimezoneOffset() * 60000 )).toISOString().split("T")[0];


    this.form.setValue(voyage);
    this.form.get("dateVoyage").setValue(t);

    // this.form.setValue(_.omit(bus,''));
  }


  // GET INFORMATION FOR ONE TRIP
  getOneTrip($key) {
    // console.log("Getting trip with key", $key);

    // SAVE THIS FOR LATER USES
   return this.firebase.database.ref("voyage/"+$key);
    
  }

}
