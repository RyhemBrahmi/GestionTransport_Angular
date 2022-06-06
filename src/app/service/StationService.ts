import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { AngularFireList }  from '@angular/fire/database';
import { BusService } from './BusService';
import { LigneService } from './LigneService';

@Injectable({
  providedIn: 'root'
})
export class StationService {
  stationList: AngularFireList<any>;

  constructor(private firebase: AngularFireDatabase, private ligneService: LigneService) { }


  getStation(){
    this.stationList = this.firebase.list('titles');
    return this.stationList;
  }

  addTitle(busKey, dataStations){
    
    console.log("Adding stations");

  }



  checkOrUnCheckTitle($key:string,flag:boolean){
    this.stationList.update($key,{ isCheckek:flag});
  }

}
