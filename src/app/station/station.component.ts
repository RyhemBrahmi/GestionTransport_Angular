import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { StationService} from 'src/app/service/StationService';
import { LigneService } from '../service/LigneService';

@Component({
  selector: 'app-station',
  templateUrl: './station.component.html',
  styleUrls: ['./station.component.scss'],
  providers : [StationService]

})
export class StationComponent implements OnInit {
  stationListArray: any[];
  dummyLigne: any;

  dummyStations = []; // DUMMY STATIONS HOLDER
  addingIndex = 0;

  selectStationMenu:boolean = false;


  constructor(private stationService: StationService, private ligneService: LigneService, public dialogRef: MatDialogRef<StationComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
    console.log(data);
    this.dummyLigne = data;
    console.log("--------------");
    console.log(this.dummyLigne);

    this.dummyStations = (data.stations)? data.stations : [];
  }
  ngOnInit() {
    // this.getData();
  }

  // GET STATION FROM THE OBJECT THEN SHOW IT 
  // OTHER METHOD: GET STATIONS LIST FROM DATABASE USING THE KEY
  getStations() {
    if(!this.dummyLigne.stations) return;

    console.log(this.dummyLigne.stations);
  }

  // GET ALL BUS LIST 
  getBusList() {

    this.selectStationMenu = false;
  }


  getData() {
    this.stationService.getStation().snapshotChanges()
    .subscribe(item => {
      this.stationListArray = [];
      item.forEach(element => {
        var x = element.payload.toJSON();
        x["$key"]= element.key;
        this.stationListArray.push(x);
      })
      //sort array isChecked false -> true
      this.stationListArray.sort((a,b) => {
        return a.isChecked - b.isChecked;
      })
    });
  }

  onAdd(itemTitle) {

    console.log(itemTitle.value);

    var v = itemTitle.value;
    var id = this.generateRandomId();
    var a = {
      id: id,
      order: this.addingIndex,
      station: v
    } 
    this.dummyStations.push(a);
    

    itemTitle.value = null;

    var dummyObject: any; 

    console.log("----------------------------");
    console.log(this.dummyLigne.key);

    this.ligneService.getOneLigne(this.dummyLigne.key).once('value', data => {
      console.log("The ligne is here");
      console.log(data.val());

      // CRATE NEW OBJECT 
      dummyObject = data.val();
      dummyObject.key = this.dummyLigne.key;
      dummyObject.stations = this.dummyStations;
      this.addingIndex++ ;

      console.log(dummyObject);
      // UDDATE LIGNE
      console.log(dummyObject);
      this.ligneService.updateLigneOvbservale(dummyObject).then(data => {
        console.log(data);
      }, err => {
        console.log(err);
      });


    }, err => {
      console.log("Can't get ligne, try again later");
    })


  }

  alterCheck($key: string,isChecked){
    this.stationService.checkOrUnCheckTitle($key,!isChecked);
  }

  onDelete(station){
    
    var stationKey = this.dummyLigne.key;
    console.log("Deleting station with id: " + station.id + " from ligne key: " + stationKey);

    var dummyObject: any;

    this.ligneService.getOneLigne(stationKey).once('value', data => {
      console.log("The ligne is here");
      console.log(data.val());

      // CRATE NEW OBJECT 
      dummyObject = data.val();
      dummyObject.key = stationKey;
      
      var tempStations = dummyObject.stations;
      console.log(dummyObject);

      // REMOVE STATION THEN UPDATE THE DOCUMENT
      var newSations = this.removeItemFromArray(station.id, tempStations);
      console.log(newSations);

      // UDDATE LIGNE

      this.ligneService.updateLigneOvbservale(dummyObject).then(data => {
        console.log(data);
        console.log("Update successfully");

        // UPDATE CURRENT LIST
        this.dummyStations = this.removeItemFromArray(station.id, this.dummyStations);

      }, err => {
        console.log(err);
      });


    }, err => {
      console.log("Can't get ligne, try again later");
    })
    
  } 


  removeItemFromArray(stationId: number, stations: any) {
    // console.log("removing item", stations.length);

    for(var i=0; i< stations.length; i++) {
      if(stations[i].id === stationId) {
        stations.splice(i, 1);
        return stations;
      }
    }
    
  }


  generateRandomId(): string {
    return '_' + (new Date().getUTCMilliseconds().toString() + new Date().getTime().toString()).toString();
  }


}
