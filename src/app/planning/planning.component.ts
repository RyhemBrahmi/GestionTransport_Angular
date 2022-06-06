import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { ImprimerTicketComponent } from '../imprimer-ticket/imprimer-ticket.component';
import { VoyageService } from '../service/VoyageService';
import { TicketListDialogComponent } from '../ticket-list-dialog/ticket-list-dialog.component';
import { TicketComponent } from '../ticket/ticket.component';
//import { VoyageListComponent } from '../voyage/voyage-list/voyage-list.component';
import { VoyagelistComponent } from '../voyagelist/voyagelist.component';

const dialogConfig = new MatDialogConfig();

@Component({
  selector: 'app-planning',
  templateUrl: './planning.component.html',
  styleUrls: ['./planning.component.scss']
})
export class PlanningComponent implements OnInit {

  constructor(private service: VoyageService,private dialog: MatDialog ) { }
  listData: any;
  displayedColumns: string[] = ['ligne','dateVoyage','stationarrivee','heuredepart','heurearrivee','matriculebus','tarifs','nombreplacedisponible','nombreplacereservee','actions'];
 //'ligne','ligneParent','stationdepart'
  searchkey: string;

  tempList = [];

  searchedDate;

  ngOnInit() {
    this.service.getVoyage().subscribe(
      list => {
        
        let array = list.map(item => {
          return {
            key: item.key,
            ...item.payload.val()
          };
        });

         //console.log(array);
        this.tempList = array;

        this.listData = new MatTableDataSource(array);
        //this.listData.sort = this.sort;
        //this.listData.paginator = this.paginator;
        //this.listData.filterPredicate = (data,filter) => {
        // return this.displayedColumns.some(ele => {
           //return ele != 'actions' && data[ele].toLowerCase().indexOf(filter) != -1;
         //});
       // };
      });
  }
  onSearchClear(){
    this.searchkey= "";
    this.applyFilter();
  }

  applyFilter(){
    // this.listData.filter = this.searchkey.trim().toLowerCase(); //tfadhel .. //mazalet 
    var v = this.searchkey.trim().toLowerCase();
    // console.log(v);
   
    this.listData = this.tempList.filter((item) => {
      return (item.stationarrivee.toLowerCase().indexOf(v) > -1);
  })

  } 
 // Reserver ticket
 bookTicket(element) {
  console.log(element);
  // var dummyElement = element; // SAME REFERENCE // HNA 3mamna copiel el refenrem mta3 l objet, hadha a3leh  
  
  // DIFFERNT REFERENCE
  var dummyElement = JSON.parse(JSON.stringify(element));

  // ki tbadel f copie jdid tetbadel fel gdima 
  // choufi 

  // console.log(dummyElement == element); // kani nafs reference bech tjina true ,
  // console.log(dummyElement === element); // hadhi nrmlent true 
  
  // VERIFY nombreplacedisponible BEFORE BOOKING A TICKET
  if(element.nombreplacedisponible>0) {

    // UPDATE voyage
    dummyElement.nombreplacedisponible -= 1;
    dummyElement.nombreplacereservee += 1;
    // console.log("After updating trip");
    // console.log(dummyElement);

    // UPDATEING THE DATABASE 
    this.service.updateVoyage(dummyElement);
   

  }else {
    alert("There is no places left for this trip");
  }
}

openTicket(row: any){

  this.service.initializeFormGroup();
  var newRow = row; 
  delete newRow.tickets;
  dialogConfig.disableClose = true;
  dialogConfig.autoFocus = true;
  dialogConfig.width= "50%";
  dialogConfig.data=newRow;
  this.dialog.open(TicketComponent,dialogConfig);
  this.service.populateForm(newRow);

}

  // Get tickets list for the given trip 
  getTickets(row: any) {
     console.log(row);
    // console.log("Get tickets", row.key);
 

    // Open Tickets in new dialog
    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = true;
    dialogConfig.width= "40%";
    dialogConfig.data= row;
    this.dialog.open(TicketListDialogComponent,dialogConfig);

  }



  getOneTrip(key) {
    this.service.getOneTrip(key).once('value', data => {

      var result = data.val();
      
      console.log(result);

      return "ryhem";

    }, err =>{
      console.log(err);
      return "";
    })
  }
  
  
  dateChange($event) {
    this.searchedDate = $event.value;
    // console.log(this.searchedDate);
  }

  onSearch(){

    // Get the input date

    if(!this.searchedDate) {
      alert("Searched date not valid");
      return;
    }

    var newDate = new Date(this.searchedDate);

    var t = newDate.getTime();
    console.log(t);
 

    this.service.initializeFormGroup();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width= "60%";
    dialogConfig.data = t;
    this.dialog.open(VoyagelistComponent,dialogConfig);
  }


}
