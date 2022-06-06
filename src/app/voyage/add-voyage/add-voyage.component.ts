import { Component, OnInit } from '@angular/core';
import {VoyageService} from '../../service/VoyageService';
import { NotificationService } from '../../service/NotificationService';
import { MatDialogRef } from '@angular/material/dialog';
import { BusService } from 'src/app/service/BusService';
import { LigneService } from 'src/app/service/LigneService';
import { fromDocRef } from '@angular/fire/firestore';

interface Food {
  value: string;
  viewValue: string;
}
@Component({
  selector: 'app-add-voyage',
  templateUrl: './add-voyage.component.html',
  styleUrls: ['./add-voyage.component.scss']
})
export class AddVoyageComponent implements OnInit {
  foodss: Food[] = [
    {value: 'Gafsa', viewValue: 'Gafsa'},
  ];
  foods: Food[] = [
    {value: 'Gafsa', viewValue: 'Gafsa'},
    {value: 'Gabes', viewValue: 'Gabes'},
    {value: 'Sfax', viewValue: 'Sfax'},
    {value: 'Tunis', viewValue: 'Tunis'},
    {value: 'Sousse', viewValue: 'Sousse'},
    {value: 'Monastir', viewValue: 'Monastir'},
    {value: 'Sidi Bouzid', viewValue: 'Sidi Bouzid'},
    {value: 'Kasserine', viewValue: 'Kasserine'},
    {value: 'Kébili', viewValue: 'Kébili'},
    {value: 'Kairouan', viewValue: 'Kairouan'},
    {value: 'Nabeul', viewValue: 'Nabeul'},
  ];

  selectMatriculeValueEnabled: boolean = false;
  /**
   * Select Menu for bus mat should be disabled untill the data is loaded
   */
  busList = [];

  // AVAILABLE PLACES 
  availablePlaces: number = 0;


  //Menu ligne
  selectLigneValueEnabled: boolean = false;

  // Liste ovages
  voyagesList = [];
  //Menu ligne
  selectVoyageValueEnabled: boolean = false;


/**
 * Select Menu for bus mat should be disabled untill the data is loaded
 */
ligneList = [];

  constructor(public service:VoyageService,  private notifactionService: NotificationService,
    public dialogRef: MatDialogRef<AddVoyageComponent>, private busService: BusService, private ligneService: LigneService) {
      this.getBusList();
      this.getLigneList();
      this.getVoyageList();
    }




  ngOnInit() {
    this.getAvailablePlacesOnStart();
  }


  selectedOption(value) {
    console.log(value);
  }

  getAvailablePlacesOnStart() {
    var key = this.service.form.get('key').value;
    if(!key) return;

    this.service.getOneTrip(key).once('value', data => {

      var result = data.val(); 
      console.log("*************")
      this.availablePlaces = result.nombreplacedisponible;
      console.log(this.availablePlaces);
    });
  }


  onClear(){
    this.service.form.reset();
    this.service.initializeFormGroup();
  }


  onSubmit(){

   
    //var bus = this.service.form.value;
    if(this.service.form.valid){

      this.service.form.controls['nombreplacedisponible'].setValue(this.availablePlaces);

      var d = this.service.form.get("dateVoyage").value;
      var da = d.toString();
      this.service.form.controls['dateVoyage'].setValue(da);

      var formData = this.service.form.value;

      console.log(da);
      console.log(formData);
       
      // return; 
 

      if (!this.service.form.get('key').value) {
        this.service.insertVoyage(formData);
        console.log(formData);
      }
        
      else {
        console.log("Updating");

        if(formData.tickets) {
          console.log("There are tickets");
        } else {
          console.log("No tickets");
        }
       
        // delete formData.tickets;

        var d = this.service.form.get("dateVoyage").value;
        var da = d.toString();

        console.log(da);
         
        this.service.form.controls['dateVoyage'].setValue(da);
        this.service.updateVoyage(this.service.form.value);
      }

      //this.service.insertBus(bus);
      this.service.form.reset();
      this.service.initializeFormGroup();
      this.notifactionService.success('opération terminée avec succès');
      this.onClose();
    }
  }
  updateVoyage() {
    console.log("Update voyage");
  }

  onClose($event?){
    if($event) $event.preventDefault();
    this.dialogRef.close();
  }


    // GET ALL BUS LIST 
    getBusList() {

      this.selectMatriculeValueEnabled = false;
  
      this.busService.getBus().subscribe( (data: any) => {
        console.log("Bus list:");
        // console.log(data);
        
        // ENABLE SELECT MENU
        this.selectMatriculeValueEnabled = true;
  
        let array = data.map(item => {
          return {
            numS: item.numS,
            ...item.payload.val()
          };
        });
  
        this.busList = array;
        console.log(array);
  
      }, err => {
        console.log("Error", err);
      })
    }
  //get all ligne
  getLigneList() {

    this.selectLigneValueEnabled = false;

    this.ligneService.getLigne().subscribe( (data: any) => {
      console.log("ligne list:");
      // console.log(data);
      
      // ENABLE SELECT MENU
      this.selectLigneValueEnabled = true;

      let array = data.map(item => {
        return {
         villedepart: item.villedepart,
          ...item.payload.val()
        };
      });

      this.ligneList = array;
      console.log("-------------------")
      console.log(array);

    }, err => {
      console.log("Error", err);
    })
  }


// Get all voyage liste 
getVoyageList() {

  this.selectVoyageValueEnabled = false;

  this.service.getVoyage().subscribe( (data: any) => {
    console.log("Voyage list:");
    // console.log(data);
    
    // ENABLE SELECT MENU
    this.selectVoyageValueEnabled = true;

    let array = data.map(item => { 
      return {
       key: item.key,
        ...item.payload.val()
      };
    });

    this.voyagesList = array;
    console.log("-------------------")
    console.log( this.voyagesList);

  }, err => {
    console.log("Error", err);
  })
}



    setAvailablePlace($event) {
      // GET KEY WHEN SELECT CHANGE
      var numS = $event.value;
      // console.log(key);
      // GET THE BUS FROM busList
      this.busList.forEach(element => {
        // COMPARE key WITH element.key TO GET THE BUS 
        if(element.numS === numS) {
          this.availablePlaces = element.nbrP;
        }
      })
    }


    setLigneValue(a, b) {
      return a + " - " + b;
    }

}
